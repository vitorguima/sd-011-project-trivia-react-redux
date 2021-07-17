import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import '../css/Feedback.css';

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
      <div className="feedback-container">
        <header>
          <img
            className="feedback-gravatar"
            src={ `https://www.gravatar.com/avatar/${email}` }
            data-testid="header-profile-picture"
            alt="gravatar"
          />
          <span className="feedback-name" data-testid="header-player-name">
            {store.player.name}
          </span>
          <p className="feedback-score">
            {'Score: '}
            <span data-testid="header-score">{store.player.score}</span>
          </p>
        </header>
        <span className="feedback-text" data-testid="feedback-text">
          {this.renderScore()}
        </span>
        <br />
        <p className="feedback-items">
          {'Final score: '}
          <span data-testid="feedback-total-score">{store.player.score}</span>
        </p>
        <p className="feedback-items">
          {'Assertions: '}
          <span data-testid="feedback-total-question">
            {store.player.assertions}
          </span>
        </p>
        <br />
        <Link className="btn-play-again" data-testid="btn-play-again" to="/">
          Jogar novamente
        </Link>
        <Link className="btn-ranking" data-testid="btn-ranking" to="/ranking">
          Ver Ranking
        </Link>
      </div>
    );
  }
}

export default Feedback;
