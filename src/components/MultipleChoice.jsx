import React from 'react';
import PropTypes from 'prop-types';

class MultipleChoice extends React.Component {
  render() {
    const { question, disabled } = this.props;
    return (
      question.answers.map((answer, index) => {
        if (question.correct_answer === answer) {
          return (
            <button
              disabled={ disabled }
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
            disabled={ disabled }
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
  disabled: (propTypes.bool).isRequired,
};

export default MultipleChoice;
