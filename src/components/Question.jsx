import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionBtn, actionClicked, actionTimer, actionScore } from '../actions';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      disableBtn: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.countDown = this.countDown.bind(this);
    this.countScore = this.countScore.bind(this);
  }

  componentDidMount() {
    this.countDown();
  }

  handleClick() {
    const { setHidden, setClicked } = this.props;
    setClicked(true);
    setHidden(false);
  }

  countScore() {
    const score = 10;
    const { questions, timer, setScore } = this.props;
    const hard = 3;
    const medium = 2;
    let state = JSON.parse(localStorage.getItem(('state')));
    let previousScore = 0;
    if (questions.difficulty === 'easy') {
      previousScore = score * (timer);
    } if (questions.difficulty === 'medium') {
      previousScore = score * (timer * medium);
    } else {
      previousScore = score * (timer * hard);
    }
    state.player.score += previousScore;
    setScore(state.player.score);
    state.player.assertions += 1;
    state = localStorage.setItem('state', JSON.stringify(state));
  }

  countDown() {
    const second = 1000;
    const { setHidden, timer, setTimer } = this.props;
    if (timer > 0) {
      const newTimer = timer - 1;
      setTimer(newTimer);
      setTimeout(this.countDown, second);
    }
    if (timer === 0) {
      this.setState({
        disableBtn: true,
      });
      setHidden(false);
    }
  }

  render() {
    const {
      questions: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      }, getClicked, timer } = this.props;
    const { disableBtn } = this.state;
    return (
      <div className="question">
        <p>{ timer }</p>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <button
          className={ getClicked && 'correct-answer' }
          type="button"
          data-testid="correct-answer"
          onClick={ () => { this.handleClick(); this.countScore(); } }
          disabled={ disableBtn }
        >
          {correctAnswer}
        </button>
        { incorrectAnswers.map((answer, index) => (
          <button
            className={ getClicked && 'wrong-answer' }
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            onClick={ this.handleClick }
            disabled={ disableBtn }
          >
            {answer}
          </button>)) }
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  getClicked: state.game.clicked,
  timer: state.game.timer,
  score: state.game.score,
});

const mapDispatchToProps = (dispatch) => ({
  setHidden: (button) => dispatch(actionBtn(button)),
  setClicked: (clicked) => dispatch(actionClicked(clicked)),
  setTimer: (timer) => dispatch(actionTimer(timer)),
  setScore: (score) => dispatch(actionScore(score)),
});

Question.propTypes = {
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setHidden: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  setClicked: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  getClicked: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};

export default connect(MapStateToProps, mapDispatchToProps)(Question);
