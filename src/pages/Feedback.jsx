import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

export default class Feedback extends Component {
  handleGravatar() {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail } = localStg.player;
    return md5(gravatarEmail).toString();
  }

  handleRanking(prev) {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { name, score, gravatarEmail } = localStg.player;
    const md5pic = md5(gravatarEmail).toString();

    const localObj = {
      name,
      score,
      picture: md5pic,
    };
    const prevarr = [prev];
    const newplayer = [...prevarr, localObj];
    window.localStorage.setItem('ranking', JSON.stringify(newplayer));
  }

  render() {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { score, name, assertions } = localStg.player;
    const prev = JSON.parse(localStorage.getItem('ranking'));
    const magicNumber = 3;
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${this.handleGravatar()}` }
            alt="Gravatar"
          />
          <h2 data-testid="header-player-name">
            Usuário:
            { name }
          </h2>
          <p data-testid="header-score">{ score }</p>
          <p data-testid="feedback-text">
            {assertions < magicNumber ? 'Podia ser melhor...' : 'Mandou bem!' }
          </p>
        </header>
        <section>
          <p data-testid="feedback-total-question">
            { assertions }
          </p>
          <p data-testid="feedback-total-score">{ score }</p>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ this.handleRanking(prev) }
            >
              Ver Ranking
            </button>
          </Link>
        </section>
      </>
    );
  }
}
