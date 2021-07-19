import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { updateScore } from '../actions';

class Feedback extends Component {
  constructor() {
    super();
    this.handleClickPlayAgain = this.handleClickPlayAgain.bind(this);
    this.handleClickRanking = this.handleClickRanking.bind(this);
  }

  componentDidMount() {
    this.rankingToLocalStorage();
  }

  handleClickPlayAgain() {
    const { updateNewScore } = this.props;
    const assertions = 0;
    const score = 0;
    updateNewScore(score, assertions);
    const { history } = this.props;
    history.push('/');
  }

  handleClickRanking() {
    const { updateNewScore } = this.props;
    const assertions = 0;
    const score = 0;
    updateNewScore(score, assertions);
    const { history } = this.props;
    history.push('/ranking');
  }

  rankingToLocalStorage() {
    const { gravatarEmail, name, score } = this.props;
    const HASH = md5(gravatarEmail).toString();
    const response = [{ name, score, picture: `https://www.gravatar.com/avatar/${HASH}` }];
    let initial = false;

    if (!localStorage.ranking || localStorage.length === 0) {
      localStorage.setItem('ranking', JSON.stringify([response[0]]));
      initial = true;
    }
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!initial) {
      ranking.push(response[0]);
    }
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const three = 3;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          {state.player.assertions < three ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h2>
        <p data-testid="feedback-total-score">{state.player.score}</p>
        <p data-testid="feedback-total-question">{state.player.assertions}</p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClickPlayAgain }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.playerReducer.gravatarEmail,
  name: state.playerReducer.name,
  score: state.playerReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  updateNewScore: (score, assertions) => dispatch(updateScore(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  history: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  updateNewScore: PropTypes.func.isRequired,
};
