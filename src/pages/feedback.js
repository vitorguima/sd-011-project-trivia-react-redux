import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

export default class feedback extends Component {
  constructor() {
    super();
    this.getUserMessage = this.getUserMessage.bind(this);
    this.redirectHomePage = this.redirectHomePage.bind(this);
    this.redirectRankingPage = this.redirectRankingPage.bind(this);
  }

  getUserMessage() {
    const localStorageAssertions = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = localStorageAssertions;
    const numberAssertions = 3;
    const message = assertions >= numberAssertions
      ? 'Mandou bem!' : 'Podia ser melhor...';
    return message;
  }

  redirectHomePage() {
    const { history } = this.props;
    history.push('/');
  }

  redirectRankingPage() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const player2 = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions, email, score } } = player2;
    const pictureHash = md5(email).toString();
    const localStorageScore = score;
    const linkImage = `https://www.gravatar.com/avatar/${pictureHash}`;
    // const number = assertions > 0
    //   ? `Acertou ${assertions} perguntas` : 'Não acertou nenhuma pergunta';
    const userMessage = this.getUserMessage();
    return (
      <div>
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
        <div>
          <p data-testid="feedback-total-score">{ Number(localStorageScore) }</p>
          <p data-testid="feedback-total-question">{ Number(assertions) }</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.redirectHomePage }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.redirectRankingPage }
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }
}

feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
