import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNextBtn } from '../actions';

class BooleanQuestion extends React.Component {
  render() {
    const { question, showBtn } = this.props;
    return (
      <>
        <button
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
          type="button"
          data-testid={
            (question.incorrect_answers.includes('True'))
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

BooleanQuestion.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  showBtn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(BooleanQuestion);
