import React, { Component } from 'react';

export default class Question extends Component {
  render() {
    const {
      questions: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } } = this.props;
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <button type="button" data-testid="correct-answer">{correctAnswer}</button>
        { incorrectAnswers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
          >
            {answer}
          </button>)) }
      </div>
    );
  }
}
