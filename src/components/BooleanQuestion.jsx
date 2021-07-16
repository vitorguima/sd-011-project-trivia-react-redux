import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNextBtn } from '../actions';

class BooleanQuestion extends React.Component {
  render() {
  const { question, showBtn, disabled, showAnswer } = this.props;
  /* if(showAnswer) {
    let trueClassName =
    (question.correct_answer === "True") ? "show-correct-answer" : "show-incorrect-answer"
    let falseClassName =
    (question.correct_answer === "False") ?  "show-correct-answer" : "show-incorrect-answer"
  } */

    return (
      <>
        <button
          className={ (showAnswer && question.correct_answer === 'True') ? 'show-correct-answer' : null }
          disabled={ disabled }
          type="button"
          data-testid={
            (question.correct_answer === 'True')
              ? 'correct-answer'
              : 'wrong-answer'
          }
          onClick={ () => showBtn() }
        >
          True
        </button>
        <button
          className={ (showAnswer && question.correct_answer === 'False') ? 'show-incorrect-answer' : null }
          disabled={ disabled }
          type="button"
          data-testid={
            (question.correct_answer === 'False')
              ? 'correct-answer'
              : 'wrong-answer'
          }
          onClick={ () => showBtn() }
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
