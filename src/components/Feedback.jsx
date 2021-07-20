import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  componentDidMount() {
    this.verifyAssertions();
  }

  verifyAssertions() {
    const received = JSON.parse(localStorage.getItem('player'));
    const { assertions } = received;
    const THREE = 3;

    if (assertions < THREE) {
      return (
        <h3 data-testid="feedback-text">Podia ser melhor...</h3>
      );
    }
    return (
      <h3 data-testid="feedback-text">Mandou bem!</h3>
    );
  }

  render() {
    return (
      <div>
        { this.verifyAssertions() }
        <h3>Fim de jogo</h3>

        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
