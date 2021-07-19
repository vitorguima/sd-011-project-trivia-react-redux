import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

export default class Feedback extends Component {
  constructor() {
    super();
    this.verifyAssetions = this.verifyAssetions.bind(this);
    // this.seeRanking = this.seeRanking.bind(this);
  }

  verifyAssetions() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const magicNum = 3;
    if (getLocalStorage.player.assertions >= magicNum) {
      return (
        <>
          <p data-testid="feedback-text">Mandou bem!</p>
          <p data-testid="feedback-total-score">{getLocalStorage.player.score}</p>
          <p data-testid="feedback-total-question">{getLocalStorage.player.assertions}</p>
        </>
      );
    } return (
      <>
        <p data-testid="feedback-text">Podia ser melhor...</p>
        <p data-testid="feedback-total-score">{getLocalStorage.player.score}</p>
        <p data-testid="feedback-total-question">{getLocalStorage.player.assertions}</p>
      </>
    );
  }

  render() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const hashEmail = md5(getLocalStorage.gravatarEmail).toString();
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <header>
          <div>
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt="profile" />
            <h3
              data-testid="header-player-name"
            >
              { getLocalStorage.player.name }
            </h3>
            <span
              data-testid="header-score"
            >
              { getLocalStorage.player.score }
            </span>
          </div>
          { this.verifyAssetions() }
        </header>
      </div>
    );
  }
}
