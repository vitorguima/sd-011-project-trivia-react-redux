import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { onClick, question: {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.props;
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          type="button"
          onClick={ onClick }
          data-testid="correct-answer"
        >
          { correctAnswer }
        </button>
        { incorrectAnswers.map((inc, index) => (
          <button
            type="button"
            onClick={ onClick }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
          >
            { inc }
          </button>
        )) }
      </div>
    );
  }
}

export default Question;

Question.propTypes = {
  onClick: PropTypes.func.isRequired,
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.string.isRequired,
  }).isRequired,
};
