import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

export default class Feedback extends Component {
  handleGravatar() {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail } = localStg.player;
    return md5(gravatarEmail).toString();
  }

  render() {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { score, name } = localStg.player;
    return (
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
        <h1 data-testid="feedback-text">
          Fdd
        </h1>
      </header>

    );
  }
}
