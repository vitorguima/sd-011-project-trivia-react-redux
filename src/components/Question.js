import React from 'react';
import PropTypes from 'prop-types';

import { decode } from 'he';
import '../style/question.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { sendScore } from '../actions';

let timeout;
let timeout2;

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 0,
      assertions: 0,
      totalScore: 0,
      redirectToFeedBack: false,
      noTimer: true,
    };

    this.setTimer = this.setTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.calcScore = this.calcScore.bind(this);
  }

  componentDidMount() {
    this.setInitialState();
  }

  componentDidUpdate() {
    const { timer, noTimer } = this.state;
    const { timer: initialTimer } = this.props;
    const second = 1000;
    if (timer === initialTimer && noTimer) {
      timeout = setTimeout((event = { target: {} }) => (
        this.clearTimer(event)
      ), timer * second);
      timeout2 = setInterval(this.setTimer, second);
    }
  }

  setTimer() {
    this.setState((old) => ({
      timer: old.timer - 1,
      noTimer: false,
    }));
  }

  setInitialState() {
    const { timer } = this.props;
    this.setState({
      timer,
    });
  }

  clearTimer({ target }) {
    const { setShowCorrect, question: { correct_answer:
      correctAnswer,
    difficulty,
    } } = this.props;
    clearInterval(timeout);
    clearInterval(timeout2);
    this.setState({
      noTimer: true,
    });
    if (target.innerText === correctAnswer) {
      this.calcScore(this.scoreDifficulty(difficulty));
    }
    // To Dispatch para o score
    setShowCorrect();
  }

  calcScore(difficulty) {
    const ten = 10;
    const { sendScoreDispatch } = this.props;
    const { timer, totalScore } = this.state;
    const score = ten + (timer * difficulty);
    this.setState((old) => ({
      assertions: old.assertions + 1,
      totalScore: old.totalScore + (score),
    }), sendScoreDispatch(totalScore + score));
  }

  scoreDifficulty(difficulty) {
    const easy = 1;
    const medium = 2;
    const hard = 3;
    switch (difficulty.toLowerCase()) {
    case 'easy':
      return easy;
    case 'medium':
      return medium;
    case 'hard':
      return hard;
    default:
      return easy;
    }
  }

  handleClickNext() {
    const { nextQuestion, index, finalQuestion } = this.props;
    const { assertions, totalScore } = this.state;
    const four = 4;
    if (index !== four) {
      this.setState({
        timer: 30,
      });
      nextQuestion();
    } else {
      finalQuestion(assertions, totalScore);
      this.setState({
        redirectToFeedBack: true,
      });
    }
  }

  renderButton() {
    return (
      <button type="button" onClick={ this.handleClickNext } data-testid="btn-next">
        Próximo
      </button>
    );
  }

  render() {
    const { showCorrect, question: {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.props;

    const { timer, redirectToFeedBack } = this.state;

    return (
      <div>
        <h3>
          Timer:
          { timer }
        </h3>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ decode(question) }</p>
        <button
          type="button"
          onClick={ this.clearTimer }
          data-testid="correct-answer"
          className={ showCorrect && 'correct' }
          disabled={ showCorrect }
        >
          { decode(correctAnswer) }
        </button>
        { incorrectAnswers.map((inc, index) => (
          <button
            type="button"
            onClick={ this.clearTimer }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className={ showCorrect && 'incorrect' }
            disabled={ showCorrect }
          >
            { decode(inc) }
          </button>
        )) }
        { showCorrect
          && this.renderButton() }
        { redirectToFeedBack
          && <Redirect to="/feedback" /> }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendScoreDispatch: (score) => {
    dispatch(sendScore(score));
  },
});

export default connect(null, mapDispatchToProps)(Question);

Question.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
  sendScoreDispatch: PropTypes.func.isRequired,
  setShowCorrect: PropTypes.func.isRequired,
  finalQuestion: PropTypes.func.isRequired,
  showCorrect: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
};
