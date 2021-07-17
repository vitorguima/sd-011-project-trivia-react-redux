import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

export default class Ranking extends Component {
  handleGravatar() {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail } = localStg.player;
    return md5(gravatarEmail).toString();
  }

  render() {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { score, name } = localStg.player;
    const index = 0; // esse index foi para não quebrar, precisamos montar o map ordenado
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${this.handleGravatar()}` }
          alt="Gravatar"
        />
        <h2 data-testid={ `player-name-${index}` }>
          Usuário:
          { name }
        </h2>
        <p data-testid="header-score">{ score }</p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Volta para a tela inicial
          </button>
        </Link>
      </div>
    );
  }
}
