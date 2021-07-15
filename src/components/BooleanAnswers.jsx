import React from 'react';
import PropTypes from 'prop-types';

class BooleanAnswers extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <>
        <button
          type="button"
          data-testid={
            question.correct_answer === 'True' ? 'correct-answer' : 'wrong-answer-0'
          }
        >
          VERDADEIRO
        </button>
        <button
          type="button"
          data-testid={
            question.correct_answer === 'False' ? 'correct-answer' : 'wrong-answer-0'
          }
        >
          FALSO
        </button>
      </>
    );
  }
}

export default BooleanAnswers;

BooleanAnswers.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
  }),
}.isRequired;
