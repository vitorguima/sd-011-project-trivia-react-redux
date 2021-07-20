import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getStorage } from '../services/API';

class Feedback extends Component {
  render() {
    const { player: { score, assertions } } = getStorage();
    const assert = 3;
    return (
      <div>
        <Header score={ score } />
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-text">
          {assertions >= assert
            ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}
export default Feedback;
