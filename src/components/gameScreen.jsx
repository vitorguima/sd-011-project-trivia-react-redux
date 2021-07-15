import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class gameScreen extends Component {
  constructor() {
    super();

    this.shuffleArray = this.shuffleArray.bind(this);
  }

  shuffleArray(received) {
    const array = [...received];
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        {results.map((question, index) => (
          <div key={ index } className="question">
            <p data-testid="question-category">
              Categoria:
              {question.category}
            </p>
            <p data-testid="question-text">
              Pergunta:
              {question.question}
            </p>
            <button type="button" data-testid="correct-answer">
              {question.correct_answer}
            </button>
            {this.shuffleArray(question.incorrect_answers).map(
              (incorrectAnswer) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ `wrong-answer-${index}` }
                >
                  {incorrectAnswer}
                </button>
              ),
            )}
          </div>
        ))}
      </div>
    );
  }
}

gameScreen.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any).isRequired,
};
