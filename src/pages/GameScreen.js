import React, { Component } from 'react';
import Header from '../components/Header'

export default class GameScreen extends Component {
  render() {
    const category = 'multiple';
    return (
      <div>
        <Header />
        <p data-testId="question-category">Categoria</p>
        <h1 data-testId="question-text">Aqui será onde vai ter as questões</h1>
        {
          category === 'multiple'
            ? (
              <div>
                <button type="button" data-testid="{`wrong-answer-{index}`}">alternativa A</button>
                <button type="button" data-testid="{`wrong-answer-{index}`}">Alternativa B</button>
                <button type="button" data-testid="{`wrong-answer-{index}`}">Alternativa C</button>
                <button type="button" data-testid="correct-answer">Alternatica D</button>
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

