import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class PlayerComponent extends Component {
  render() {
    const player2 = JSON.parse(localStorage.getItem('state'));
    const score = JSON.parse(localStorage.getItem('state'));
    const pictureHash = md5(player2.player.email).toString();
    const linkImage = `https://www.gravatar.com/avatar/${pictureHash}`;
    return (
      <header>
        <p data-testid="header-player-name">{ player2.player.name }</p>
        <img
          data-testid="header-profile-picture"
          src={ linkImage }
          alt="User Gravatar"
        />
        <p data-testid="header-score">{score.player.score}</p>
      </header>
    );
  }
}

export default PlayerComponent;
