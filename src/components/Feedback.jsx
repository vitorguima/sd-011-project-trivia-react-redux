import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  componentDidMount() {
    this.verifyAssertions();
  }

  verifyAssertions() {
    const received = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = received.player;
    const THREE = 3;

    if (assertions === 0) {
      return (
        <div>
          <h3>Não acertou nenhuma pergunta</h3>
          <p>
            Score:
            &nbsp;
            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p>
            Assertions:
            &nbsp;
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>
          <h3 data-testid="feedback-text">Podia ser melhor...</h3>
        </div>
      );
    }
    if (assertions < THREE) {
      return (
        <div>
          <h3
            data-testid="feedback-total-question"
          >
            {assertions}
          </h3>
          <h3 data-testid="feedback-total-score">{score}</h3>
          <h3 data-testid="feedback-text">Podia ser melhor...</h3>
        </div>
      );
    }
    return (
      <div>
        <h3
          data-testid="feedback-total-question"
        >
          {assertions}
        </h3>
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3 data-testid="feedback-text">Mandou bem!</h3>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Fim de jogo</h2>
        <br />
        { this.verifyAssertions() }
        <br />
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
