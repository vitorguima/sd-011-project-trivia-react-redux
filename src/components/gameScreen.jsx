import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class gameScreen extends Component {
  constructor() {
    super();
    
    this.state = {
      question: 0,
    };
  }

  render() {
    const { results } = this.props;
    const { question } = this.state;
    console.log(results);
    return (
      <div>
        {results.length > 0 ? (
          <div>
            <p data-testid="question-category">{results[question].category}</p>
            <p data-testid="question-text">{results[question].question}</p>
            <button type="button" data-testid="correct-answer">
              {results[question].correct_answer}
            </button>
            {results[0].incorrect_answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {answer}
              </button>
            ))}
          </div>
        ) : (
          <p>Baixando Questões</p>
        )}
      </div>
    );
  }
}

gameScreen.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any).isRequired,
};
