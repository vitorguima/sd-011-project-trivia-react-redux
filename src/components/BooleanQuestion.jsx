import React from 'react';
import PropTypes from 'prop-types';

class BooleanQuestion extends React.Component {
  render() {
    const { question, disabled } = this.props;
    return (
      <>
        <button
          disabled={ disabled }
          type="button"
          data-testid={
            (question.correct_answer === 'True')
              ? 'correct-answer'
              : 'wrong-answer'
          }
        >
          True
        </button>
        <button
          disabled={ disabled }
          type="button"
          data-testid={
            (question.incorrect_answers.includes('True'))
              ? 'correct-answer'
              : 'wrong-answer'
          }
        >
          False
        </button>
      </>
    );
  }
}

BooleanQuestion.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  disabled: (PropTypes.bool).isRequired,
};

export default BooleanQuestion;
