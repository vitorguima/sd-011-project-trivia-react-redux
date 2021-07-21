import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { answerBtnAction } from '../actions';

class Results extends Component {
  constructor(props) {
    super(props);

    this.btnProps = this.btnProps.bind(this);
    this.plyScore = this.plyScore.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  buttonClicked(name, buttonClickedProp) {
    if (name === 'correctAnswer') {
      const storage = JSON.parse(localStorage.getItem('state'));
      storage.player.assertions += 1;
      localStorage.setItem('state', JSON.stringify(storage));
    }
    buttonClickedProp();
  }

  plyScore(name, { difficulty }, timer) {
    if (name === 'correctAnswer') {
      const storage = JSON.parse(localStorage.getItem('state'));
      const initial = 10;
      const medium = 2;
      const hard = 3;
      switch (difficulty) {
      case 'medium':
        storage.player.score += initial + (timer * medium);
        localStorage.setItem('state', JSON.stringify(storage));
        break;
      case 'hard':
        storage.player.score += initial + (timer * hard);
        localStorage.setItem('state', JSON.stringify(storage));
        break;
      default:
        storage.player.score += initial + timer;
        localStorage.setItem('state', JSON.stringify(storage));
        break;
      }
    }
  }

  btnProps(event) {
    const { name } = event.target;
    const { buttonClickedProp, results, timer } = this.props;
    this.buttonClicked(name, buttonClickedProp);
    this.plyScore(name, results, timer);
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
            onClick={ this.btnProps }
            style={
              // style inside a ternary
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
              onClick={ this.btnProps }
              style={
                // style inside a ternary
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
  buttonClickedProp: () => dispatch(answerBtnAction()),
});

Results.propTypes = {
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.array,
  answerClicked: PropTypes.bool,
  buttonClicked: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Results);
