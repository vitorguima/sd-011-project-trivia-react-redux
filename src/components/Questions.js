import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Questions.css';
import { disableButtonTrue } from '../actions';

class Questions extends Component {
  constructor(props) {
    super(props);

    const { difficulty } = props;

    this.state = {
      correctAnswer: 'answer',
      wrongAnswer: 'answer',
      time: null,
      answered: false,
      difficulty: difficulty,
      score: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.initailTime = this.initailTime.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
    this.saveScoreState = this.saveScoreState.bind(this);
    this.scoreMode = this.scoreMode.bind(this);
  }

  componentDidMount() {
    this.initailTime();
  }

  componentDidUpdate() {
    const { answered } = this.state;
    if (!answered) {
      this.decrementTime();
    }
  }

  handleClick() {
    this.setState({
      correctAnswer: 'correct-answer',
      wrongAnswer: 'wrong-answer',
      answered: true,
    }, () => {
      this.saveScoreState();
    });
  }

  decrementTime() {
    const { time } = this.state;
    const interval = 1000;
    if (time > 0) {
      setTimeout(() => {
        this.setState({
          time: time - 1,
        });
      }, interval);
    } else {
      const { timeOut } = this.props;
      timeOut(true);
    }
  }

  initailTime() {
    this.setState({
      time: 30,
    });
  }

  scoreMode() {
    const { difficulty, time } = this.state;
    let score = 0;
    const ten = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    if (difficulty === 'hard') {
      score = ten + (time * hard);
    } else if (difficulty === 'medium') {
      score = ten + (time * medium);
    } else if (difficulty === 'easy') {
      score = ten + (time * easy);
    }
    return score;
  }

  saveScoreState() {
    const newScore = this.scoreMode();
    this.setState({
      score: newScore,
    });
  }

  render() {
    const { questionsState, loading, buttonsDisabled } = this.props;
    const { correctAnswer, wrongAnswer, time, score } = this.state;

    return (
      <div>
        <p>{ time }</p>
        <p>{ score }</p>
        {loading
          ? <h4>Loading...</h4>
          : (
            <div>
              <p data-testid="question-category">{ questionsState[0].category }</p>
              <h3 data-testid="question-text">{ questionsState[0].question }</h3>
              <button
                data-testid="correct-answer"
                className={ correctAnswer }
                type="button"
                disabled={ buttonsDisabled }
                onClick={ () => this.handleClick() }
              >
                { questionsState[0].correct_answer }
              </button>
              { questionsState[0].incorrect_answers.map((incorrect, key) => (
                <button
                  data-testid={ `wrong-answer-${key}` }
                  className={ wrongAnswer }
                  type="button"
                  key={ key }
                  disabled={ buttonsDisabled }
                  onClick={ () => this.handleClick() }
                >
                  { incorrect }
                </button>
              )) }
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsState: state.questionsReducer.questions,
  loading: state.questionsReducer.loading,
  buttonsDisabled: state.timerReducer.buttonsDisabledFromTimer,
});

const mapDispatchToProps = (dispatch) => ({
  timeOut: (disabled) => dispatch(disableButtonTrue(disabled)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  buttonsDisabled: PropTypes.func.isRequired,
  questionsState: PropTypes.arrayOf().isRequired,
  loading: PropTypes.bool.isRequired,
  timeOut: PropTypes.func.isRequired,
};
