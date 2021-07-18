import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      scoreTotal: 50,
      asertions: 4,
      message: '',
    };
    this.scoreMessage = this.scoreMessage.bind(this);
  }

  scoreMessage() {
    const { asertions } = this.state;
    const number = 3;
    if (asertions < number) {
      this.setState({ message: 'Podia ser melhor...' });
    } else {
      this.setState({ message: 'Mandou bem!' });
    }
  }

  render() {
    const { scoreTotal, asertions, message } = this.state;
    return (
      <>
        <h1 data-testid="feedback-text">{ message }</h1>
        <p data-testid="feedback-total-question">
          { `Você acertou ${asertions} questões` }
        </p>
        <h3 data-testid="feedback-total-score">{ `Um total de ${scoreTotal} pontos` }</h3>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
        <Link to="/jogo">
          <button type="button" data-testid="btn-play-again">
            Jogar Novamente
          </button>
        </Link>
      </>
    );
  }
}

export default Feedback;
