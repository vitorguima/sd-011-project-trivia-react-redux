import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { getPlayerLocalStorage, createRanking } from '../services/LocalStorage';

export default class Feedback extends Component {
  constructor() {
    super();

    this.feedbackmsg = this.feedbackmsg.bind(this);
  }

  componentDidMount() {
    this.feedbackmsg();
  }

  feedbackmsg() {
    const user = getPlayerLocalStorage();
    const { player } = user;
    const generateHash = md5(player.gravatarEmail).toString();
    const response = `https://www.gravatar.com/avatar/${generateHash}`;
    const rankingPlayers = { name: player.name, score: player.score, picture: response };
    createRanking(rankingPlayers);
    const three = 3;
    const msg = (player.assertions >= three) ? 'Mandou bem!' : 'Podia ser melhor...';
    return msg;
  }

  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{ this.feedbackmsg() }</h3>
        <h2
          data-testid="feedback-total-score"
        >
          { getPlayerLocalStorage().player.score }
        </h2>
        <h2
          data-testid="feedback-total-question"
        >
          { getPlayerLocalStorage().player.assertions }
        </h2>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}
