import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../redux/actions';

class HandleQuestions extends Component {
  constructor() {
    super();

    this.state = {
      questionIndex: 0,
      timer: 30,
      bool: false,
      finalscore: 0,
      assertions: 0,
      IntervalTimer: null,
    };
  }

  componentDidMount() {
    const { token, fetchAPIQuestions } = this.props;
    fetchAPIQuestions(token);
    this.timerAnswer();
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    const { clickedHandle } = this.props;
    const QuestionsNumber = 4;
    if (questionIndex < QuestionsNumber) {
      this.setState({
        questionIndex: (questionIndex + 1),
        timer: 30,
      });
    }
    clickedHandle(false);
    if (questionIndex === QuestionsNumber) {
      this.setState({
        bool: true,
      });
    }
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
    this.setState({
      IntervalTimer,
    });
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
    const { timer, IntervalTimer } = this.state;
    const { scorePoint } = this.props;
    const correctAnswerValue = 10;
    const level = this.checkLevel();
    const score = correctAnswerValue + (timer * level);
    scorePoint(score);
    this.handleClick(target);
    this.setState((prev) => ({
      finalscore: prev.finalscore + score,
      assertions: prev.assertions + 1,
    }), () => {
      const { finalscore, assertions } = this.state;
      const getStateStorage = JSON.parse(localStorage.getItem('state'));
      getStateStorage.player.score = finalscore;
      getStateStorage.player.assertions = assertions;
      localStorage.setItem('state', JSON.stringify(getStateStorage));
      clearInterval(IntervalTimer);
    });
  }

  handleQuestions({ results }) {
    const { clicked } = this.props;
    const { timer, questionIndex, bool } = this.state;
    if (results) {
      return (
        <section>
          <h3 data-testid="question-category">{results[questionIndex].category}</h3>
          <h3 data-testid="question-text">{results[questionIndex].question}</h3>
          <button
            onClick={ (event) => this.sumPoint(event) }
            data-testid="correct-answer"
            type="button"
            disabled={ clicked }
            value={ results[questionIndex].correct_answer }
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
          {
            clicked
          && (
            <button
              type="button"
              data-testid="btn-next"
              disabled={ !clicked }
              onClick={ () => this.nextQuestion() }
            >
              Próxima
            </button>)
          }
          <span>{timer}</span>
          { bool && <Redirect to="/feedback" /> }
        </section>
      );
    }
  }

  render() {
    const { questionsData } = this.props;
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
  name: state.playerReducer.name,
  assertions: state.playerReducer.assertions,
  gravatarEmail: state.playerReducer.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  scorePoint: (payload) => dispatch(actions.setScore(payload)),
  fetchAPIQuestions: (parm) => dispatch(actions.fetchAPIQuestions(parm)),
  clickedHandle: (bool) => dispatch(actions.clickedHandle(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandleQuestions);
