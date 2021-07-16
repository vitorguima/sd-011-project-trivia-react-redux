import React from 'react';
import PropTypes from 'prop-types';

class MultipleChoice extends React.Component {
  render() {
    const { question } = this.props;
    return (
      question.answers.map((answer, index) => {
        if (question.correct_answer === answer) {
          return (
            <button
              data-testid="correct-answer"
              key={ index }
              type="button"
            >
              { answer }
            </button>
          );
        }
        return (
          <button
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            type="button"
          >
            { answer }
          </button>
        );
      })
    );
  }
}

MultipleChoice.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.string,
  }).isRequired,
};

export default MultipleChoice;
