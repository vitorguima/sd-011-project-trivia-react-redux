import React, { Component } from 'react';

export default class gameScreen extends Component {
  render() {
    const { results } = this.props;
    return (
      <div>
        {results.map((question, index) => (
          <div key={index}>
            <p data-testid="question-category">Categoria: {question.category}</p>
            <p data-testid="question-text">Pergunta: {question.question}</p>
            <button data-testid="correct-answer">{question.correct_answer}</button>
            {question.incorrect_answers.map((incorrectAnswer, index) => (
              <button data-testid={ `wrong-answer-${index}` } >{incorrectAnswer}</button>
            ))}
          </div>
        ))}

      </div>
    );
  }
}
