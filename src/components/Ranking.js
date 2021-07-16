import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from './Header';

class Ranking extends Component {
  constructor() {
    super();
    this.handleClickPlayAgain = this.handleClickPlayAgain.bind(this);
  }

  handleClickPlayAgain() {
    const { history } = this.props;
    history.push('/');
  }

  rankingToLocalStorage() {
    const { gravatarEmail, name, score } = this.props;
    const HASH = md5(gravatarEmail).toString();
    const ranking = { ranking: { name, score, picture: `https://www.gravatar.com/avatar/${HASH}` } };
    localStorage.setItem('state', JSON.stringify(ranking));
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <Header />
        <h2 data-testid="ranking-title">Ranking</h2>
        <p>{state.player.score}</p>
        <p>{state.player.assertions}</p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClickPlayAgain }
        >
          Jogar novamente
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

export default connect(mapStateToProps)(Ranking);

Ranking.propTypes = {
  history: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
