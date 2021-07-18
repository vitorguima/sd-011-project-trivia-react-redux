import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Feedback extends Component {
  correctQuestions() {
    const state = JSON.parse(localStorage.getItem('state'));
    const corrects = state.player.assertions;
    const minCorrects = 3;
    if (corrects < minCorrects) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{ this.correctQuestions() }</h3>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ir para o ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}
