import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import '../CSS/Feedback.css';

export default class Feedback extends Component {
  getPlayerFromLocalStorage() {
    const playerInfo = localStorage.getItem('state');
    return JSON.parse(playerInfo);
  }

  render() {
    const { name, gravatarEmail, score } = this.getPlayerFromLocalStorage();
    const emailHash = md5(gravatarEmail.trim().toLowerCase()).toString();
    const gravatarPicture = `https://www.gravatar.com/avatar/${emailHash}`;

    return (
      <div className="trivia__feedback">
        <img data-testid="header-profile-picture" src={ gravatarPicture } alt="" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h data-testid="header-score">{ score }</h>
      </div>
    );
  }
}
