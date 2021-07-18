import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { addRanking } from '../actions';

class Feedback extends Component {
  handleGravatar() {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail } = localStg.player;
    return md5(gravatarEmail).toString();
  }

  handleRanking() {
    const { addRank } = this.props;
    const storageState = JSON.parse(localStorage.getItem('state'));
    const { name, score, gravatarEmail } = storageState.player;
    const md5pic = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    // const array = [];
    const obj = { name, score, picture: md5pic };
    // array.push(obj);
    addRank(obj);
  }

  render() {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { score, name, assertions } = localStg.player;
    const magicNumber = 3;
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${this.handleGravatar()}` }
            alt="Gravatar"
          />
          <h2 data-testid="header-player-name">
            Usuário:
            { name }
          </h2>
          <p data-testid="header-score">{ score }</p>
          <p data-testid="feedback-text">
            {assertions < magicNumber ? 'Podia ser melhor...' : 'Mandou bem!' }
          </p>
        </header>
        <section>
          <p data-testid="feedback-total-question">
            { assertions }
          </p>
          <p data-testid="feedback-total-score">{ score }</p>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ this.handleRanking() }
            >
              Ver Ranking
            </button>
          </Link>
        </section>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addRank: (payload) => dispatch(addRanking(payload)),
});

export default connect(null, mapDispatchToProps)(Feedback);
