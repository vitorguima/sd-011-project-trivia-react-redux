import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class gameScreen extends Component {
  render() {
    const category = 'multiple';
    return (
      <div>
        <span data-testId="question-category">Categoria</span>
        <h2 data-testId="question-text">Texto da questão</h2>
        {
          category === 'multiple'
            ? (
              <div>
                <button type="button" data-testid="{`wrong-answer-{index}`}">q1</button>
                <button type="button" data-testid="{`wrong-answer-{index}`}">q2</button>
                <button type="button" data-testid="{`wrong-answer-{index}`}">q3</button>
                <button type="button" data-testid="correct-answer">q4</button>
              </div>
            ) : (
              <div>
                <button type="button" data-testid="{`wrong-answer-{index}`}">
                  verdadeiro
                </button>

                <button type="button" data-testid="correct-answer">
                  falso
                </button>
              </div>
            )
        }
      </div>
    );
  }
}

// gameScreen.propTypes = {
//   category: PropTypes.string.isRequired,
// };
