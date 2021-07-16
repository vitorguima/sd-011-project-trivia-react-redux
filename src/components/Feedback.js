import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  renderScore() {
    const store = JSON.parse(localStorage.getItem('state'));
    const { assertions } = store.player;
    const minAssertions = 3;
    if (assertions < minAssertions) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const store = JSON.parse(localStorage.getItem('state'));
    const email = md5(store.player.gravatarEmail).toString();

    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${email}` }
            data-testid="header-profile-picture"
            alt="gravatar"
          />
          <span data-testid="header-player-name">{store.player.name}</span>
          <span data-testid="header-score">{store.player.score}</span>
        </header>
        <span data-testid="feedback-text">{this.renderScore()}</span>
        <span data-testid="feedback-total-score">{store.player.score}</span>
        <span data-testid="feedback-total-question">
          {store.player.assertions}
        </span>
        <Link data-testid="btn-play-again" to="/">
          Jogar novamente
        </Link>
        <Link data-testid="btn-ranking" to="/ranking">
          Ver Ranking
        </Link>
      </div>
    );
  }
}

export default Feedback;
