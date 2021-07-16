import React from 'react';
import PropTypes from 'prop-types';

import '../style/question.css';

class Question extends React.Component {
  render() {
    const { nextQuestion, showCorrect, setShowCorrect, question: {
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
          onClick={ setShowCorrect }
          data-testid="correct-answer"
          className={ showCorrect && 'correct' }
        >
          { correctAnswer }
        </button>
        { incorrectAnswers.map((inc, index) => (
          <button
            type="button"
            onClick={ setShowCorrect }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className={ showCorrect && 'incorrect' }
          >
            { inc }
          </button>
        )) }
        { showCorrect && <button type="button" onClick={ nextQuestion }>Próximo</button> }
      </div>
    );
  }
}

export default Question;

Question.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
  setShowCorrect: PropTypes.func.isRequired,
  showCorrect: PropTypes.bool.isRequired,
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.string,
  }).isRequired,
};
