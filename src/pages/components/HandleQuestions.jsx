import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class HandleQuestions extends Component {
  constructor() {
    super();

    this.state = {
      questionIndex: 0,
      timer: 30,
    };
  }

  componentDidMount() {
    const { token, fetchAPIQuestions } = this.props;
    fetchAPIQuestions(token);
    this.timerAnswer();
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    this.setState({
      questionIndex: (questionIndex + 1),
      timer: 30,
    });
  }

  handleClick() {
    const { clickedHandle } = this.props;
    clickedHandle(true);
  }

  timerAnswer() {
    const time = 30000;
    const interval = 1000;
    const IntervalTimer = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) this.setState({ timer: timer - 1 });
    }, interval);
    setTimeout(() => clearInterval(IntervalTimer), time);
    setTimeout(() => this.handleClick(), time);
  }

  checkLevel() {
    const { questionIndex } = this.state;
    const { questionsData } = this.props;
    const { difficulty } = questionsData.results[questionIndex]; // <---------------------impacou nesse difficulty
    let level = 0;
    const hardAnswerValue = 3; // magicNumber do meu agrado
    switch (difficulty) {
    case 'easy':
      level = 1;
      return level;
    case 'medium':
      level = 2;
      return level;
    case 'hard':
      level = hardAnswerValue;
      return level;
    default:
      return level;
    }
  }

  sumPoint({ target }) {
    const { timer } = this.state;
    const { scorePoint } = this.props;
    const correctAnswerValue = 10;
    const level = this.checkLevel();
    const score = correctAnswerValue + (timer * level);
    scorePoint(score);
    localStorage.setItem('state', JSON.stringify({
      player: { score },
    }));
    this.handleClick(target);
  }

  handleQuestions({ results }) {
    const { clicked } = this.props;
    const { timer, questionIndex } = this.state;
    if (results) {
      return (
        <section>
          <h3 data-testid="question-category">{results[questionIndex].category}</h3>
          <h3 data-testid="question-text">{results[questionIndex].question}</h3>
          <button
            onClick={ (event) => this.sumPoint(event.target) }
            data-testid="correct-answer"
            type="button"
            disabled={ clicked }
            style={ clicked ? { border: '3px solid rgb(6, 240, 15)' } : null }
          >
            {results[questionIndex].correct_answer}
          </button>
          {results[questionIndex].incorrect_answers.map((answer, index) => (
            <button
              onClick={ () => this.handleClick() }
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              disabled={ clicked }
              type="button"
              style={ clicked ? { border: '3px solid rgb(255, 0, 0)' } : null }
            >
              {answer}
            </button>
          ))}
          <button
            type="button"
            disabled={ !clicked }
            onClick={ () => this.nextQuestion() }
          >
            Proximo
          </button>
          <span>{timer}</span>
        </section>
      );
    }
  }

  render() {
    const { questionIndex } = this.state;
    const { questionsData } = this.props;

    console.log(questionsData[questionIndex]);
    return (
      <>
        {this.handleQuestions(questionsData)}
      </>
    );
  }
}

HandleQuestions.propTypes = {
  fetchAPIQuestions: PropTypes.func.isRequired,
  clickedHandle: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired,
  token: PropTypes.bool.isRequired,
  scorePoint: PropTypes.func.isRequired,
  questionsData: PropTypes.shape({
    results: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questionsData: state.gameReducer.questionsData,
  clicked: state.gameReducer.clicked,
});

const mapDispatchToProps = (dispatch) => ({
  scorePoint: (payload) => dispatch(actions.setScore(payload)),
  fetchAPIQuestions: (parm) => dispatch(actions.fetchAPIQuestions(parm)),
  clickedHandle: (bool) => dispatch(actions.clickedHandle(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandleQuestions);
