import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

export default class feedback extends Component {
  constructor() {
    super();
    this.getUserMessage = this.getUserMessage.bind(this);
  }

  getUserMessage() {
    const localStorageAssertions = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = localStorageAssertions;
    const numberAssertions = 3;
    const message = assertions >= numberAssertions ? 'Mandou bem!' : 'Podia ser melhor...';
    return message;
  }

  render() {
    const player2 = JSON.parse(localStorage.getItem('state'));
    const pictureHash = md5(player2.player.email).toString();
    const localStorageScore = player2.player.score;
    const linkImage = `https://www.gravatar.com/avatar/${pictureHash}`;
    const userMessage = this.getUserMessage();
    return (
      <header>
        <h1 data-testid="feedback-text">Feedback</h1>
        <p data-testid="header-player-name">{ player2.player.name }</p>
        <img
          data-testid="header-profile-picture"
          src={ linkImage }
          alt="User Gravatar"
        />
        <p data-testid="header-score">{ Number(localStorageScore) }</p>
        <h1 data-testid="feedback-text">{ userMessage }</h1>
      </header>
    );
  }
}
