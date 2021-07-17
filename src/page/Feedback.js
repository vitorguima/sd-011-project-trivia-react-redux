import React, { Component } from 'react';
import Header from './components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      score: 3,
      rightAnswers: 0,

    };
    this.performanceAnswer = this.performanceAnswer.bind(this);
  }

  performanceAnswer() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const Assertions = getLocalStorage.player.assertions;
    const controlScore = 3;
    if (Assertions < controlScore) {
      return (
        <p>Podia ser melhor...</p>
      );
    }
    if (Assertions >= controlScore) {
      return (
        <p>Mandou bem!</p>
      );
    }
  }

  render() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const point = getLocalStorage.player.score;
    const Assertions = getLocalStorage.player.assertions;

    return (
      <>
        <header>
          <Header />
          <h4 data-testid="feedback-text">{this.performanceAnswer()}</h4>
        </header>

        <span>
          <h4 data-testid="feedback-total-score">
            Placar Final:
            { point }
          </h4>
          <h4 data-testid="feedback-total-question">
            {`${Assertions > 0
              ? `Acertou ${Assertions} perguntas` : 'Não acertou nenhuma pergunta'}`}
          </h4>
        </span>
      </>
    );
  }
}

export default Feedback;
