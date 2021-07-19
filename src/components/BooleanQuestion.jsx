import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNextBtn } from '../actions';

class BooleanQuestion extends React.Component {
  render() {
    const { question, showBtn, disabled, showAnswer, timer, localStoragePlayerInfo } = this.props;
    const correctAnswer = (showAnswer) ? 'show-correct-answer' : null;
    const incorrectAnswer = (showAnswer) ? 'show-incorrect-answer' : null;
    return (
      <>
        <button
          className={
            (question.correct_answer === 'True')
              ? correctAnswer
              : incorrectAnswer
          }
          disabled={ disabled }
          type="button"
          data-testid={
            (question.correct_answer === 'True')
              ? 'correct-answer'
              : 'wrong-answer'
          }
          onClick={ () =>{
            if (question.correct_answer === 'True') {
              localStoragePlayerInfo(timer, question.difficulty)
              showBtn() 
            }
            showBtn()
          }}
        >
          True
        </button>
        <button
          className={
            (question.correct_answer === 'False')
              ? correctAnswer
              : incorrectAnswer
          }
          disabled={ disabled }
          type="button"
          data-testid={
            (question.correct_answer === 'False')
              ? 'correct-answer'
              : 'wrong-answer'
          }
          onClick={ () =>{
            if (question.correct_answer === 'False') {
              localStoragePlayerInfo(timer, question.difficulty)
              showBtn() 
            }
            showBtn()
          }}
        >
          False
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showBtn: () => dispatch(showNextBtn()),
});

const mapStateToProps = (state) => ({
  showAnswer: state.questionsReducer.showBtn,
  timer: state.countDownReducer.timer,
});

BooleanQuestion.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  showBtn: PropTypes.func.isRequired,
  disabled: (PropTypes.bool).isRequired,
  showAnswer: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooleanQuestion);
