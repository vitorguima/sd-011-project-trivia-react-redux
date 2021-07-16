import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

export default class FeedBack extends Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
    };

    this.getStorageAssertions = this.getStorageAssertions.bind(this);
    this.getPlayerFromLocalStorage = this.getPlayerFromLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getStorageAssertions();
  }

  getStorageAssertions() {
    const storage = JSON.parse(localStorage.getItem('state'));
    console.log(storage);
    this.setState({
      assertions: storage.player.assertions,
    });
  }

  getPlayerFromLocalStorage() {
    const playerInfo = localStorage.getItem('state');
    return JSON.parse(playerInfo);
  }

  message() {
    const { assertions } = this.state;
    const magicNumber = 3;
    if (assertions < magicNumber) return 'Podia ser melhor...';
    if (assertions >= magicNumber) return 'Mandou bem!';
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
        <p data-testid="feedback-text">{this.message()}</p>
        <h4 data-testid="feedback-total-score">{ score }</h4>
        <h4 data-testid="feedback-total-question">{ assertions }</h4>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novament
          </button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}
