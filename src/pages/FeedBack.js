import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

export default class FeedBack extends Component {
  constructor() {
    super();
    this.getPlayerFromLocalStorage = this.getPlayerFromLocalStorage.bind(this);
  }

  getPlayerFromLocalStorage() {
    const playerInfo = localStorage.getItem('state');
    return JSON.parse(playerInfo);
  }

  render() {
    const { player } = this.getPlayerFromLocalStorage();
    const { name, score, gravatarEmail, assertions } = player;
    const gravatarHash = md5(gravatarEmail.trim().toLowerCase()).toString();
    const gravatarPicture = `https://www.gravatar.com/avatar/${gravatarHash}`;
    return (
      <div className="feedback__container">
        <h1 data-testid="feedback-text">FeedBack</h1>
        <img data-testid="header-profile-picture" src={ gravatarPicture } alt="Player" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h3 data-testid="header-score">{ score }</h3>
        <h4 data-testid="feedback-total-score">{ score }</h4>
        <h4 data-testid="feedback-total-question">{ assertions }</h4>
      </div>
    );
  }
}
