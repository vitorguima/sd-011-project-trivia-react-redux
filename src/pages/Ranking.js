
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  getPlayer() {
    const getPlayerByLocal = JSON.parse(localStorage.getItem('ranking'));
    return getPlayerByLocal.map((players, length) => (
      <div key={ length }>
        <img alt={ `gravatar do usuario com o ranking ${length}` } src={ `https://www.gravatar.com/avatar/${md5(players.gravatarEmail).toString()}` } />
        <div data-testid={ `player-name-${length}` }>{players.name}</div>
        <div data-testid={ `player-score-${length}` }>{players.score}</div>
      </div>));
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">ranking</h1>

        {this.getPlayer()}

        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}


export default Ranking;

