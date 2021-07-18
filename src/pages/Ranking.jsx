import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRanking } from '../actions';

class Ranking extends Component {
  componentDidMount() {
    this.handleRanking();
  }

  handleGravatar() {
    const localStg = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail } = localStg.player;
    return md5(gravatarEmail).toString();
  }

  handleRanking() {
    const { addRank, rank } = this.props;
    const storageState = JSON.parse(localStorage.getItem('state'));
    const { name, score, gravatarEmail } = storageState.player;
    const md5pic = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    const rankingStg = { name, score, picture: md5pic };
    addRank(rankingStg);
    localStorage.setItem('ranking', JSON.stringify([...rank, rankingStg]));
  }

  render() {
    const { rank } = this.props;
    const sortedRank = rank.sort((a, b) => b.score - a.score);
    return (
      <>
        {sortedRank.map(({ name, score }, index) => (
          <div key={ index }>
            <h1 data-testid="ranking-title">
              Ranking
            </h1>
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${this.handleGravatar()}` }
              alt="Gravatar"
            />
            <h2 data-testid={ `player-name-${index}` }>
              {name}

            </h2>
            <p data-testid="header-score">
              {score}
              {' '}
            </p>
          </div>))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Volta para a tela inicial
          </button>
        </Link>
      </>

    );
  }
}

Ranking.propTypes = {
  addRank: PropTypes.func.isRequired,
  rank: PropTypes.shape({
    sort: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  rank: state.ranking.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  addRank: (payload) => dispatch(addRanking(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
