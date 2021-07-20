import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { answerButtonClickedAction } from '../actions';

class Answers extends Component {
  constructor(props) {
    super(props);

    this.buttonProps = this.buttonProps.bind(this);
    this.playerScore = this.playerScore.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  buttonClicked(name, buttonClickedProp) {
    if (name === 'correctAnswer') {
      const notRedux = JSON.parse(localStorage.getItem('state'));
      notRedux.player.assertions += 1;
      localStorage.setItem('state', JSON.stringify(notRedux));
    }
    buttonClickedProp();
  }

  playerScore(name, { difficulty }, timer) {
    if (name === 'correctAnswer') {
      const notRedux = JSON.parse(localStorage.getItem('state'));
      const MEDIUM_DIFFICULTY = 2;
      const HARD_DIFFICULTY = 3;
      const BASE = 10;
      switch (difficulty) {
      case 'medium':
        notRedux.player.score += BASE + (timer * MEDIUM_DIFFICULTY);
        localStorage.setItem('state', JSON.stringify(notRedux));
        break;
      case 'hard':
        notRedux.player.score += BASE + (timer * HARD_DIFFICULTY);
        localStorage.setItem('state', JSON.stringify(notRedux));
        break;
      default:
        notRedux.player.score += BASE + timer;
        localStorage.setItem('state', JSON.stringify(notRedux));
        break;
      }
    }
  }

  buttonProps(event) {
    const { name } = event.target;
    const { buttonClickedProp, results, timer } = this.props;
    this.buttonClicked(name, buttonClickedProp);
    this.playerScore(name, results, timer);
  }

  render() {
    const { results, answerClicked, timer } = this.props;
    return (
      <ul>
        <li>
          <button
            disabled={ answerClicked || timer === 0 }
            type="button"
            data-testid="correct-answer"
            onClick={ this.buttonProps }
            style={
              answerClicked ? { border: '3px solid rgb(6, 240, 15)', padding: '10px' }
                : { padding: '10px' }
            }
            name="correctAnswer"
          >
            {results.correct_answer}
          </button>
        </li>
        {results.incorrect_answers.map((answer, index) => (
          <li key={ index }>
            <button
              disabled={ answerClicked || timer === 0 }
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.buttonProps }
              style={
                answerClicked ? { border: '3px solid rgb(255, 0, 0)', padding: '10px' }
                  : { padding: '10px' }
              }
              name="incorrectAnswer"
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  answerClicked: state.gameReducer.answerClicked,
});

const mapDispatchToProps = (dispatch) => ({
  buttonClickedProp: () => dispatch(answerButtonClickedAction()),
});

Answers.propTypes = {
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.array,
  answerClicked: PropTypes.bool,
  buttonClicked: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
