import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { savePlayerToRank } from '../redux/actions';

class Ranking extends Component {
  componentDidMount() {
    const { savePlayerRankAct, rankState } = this.props;
    const savePlayerInfo = JSON.parse(localStorage.getItem('state'));
    const hash = md5(savePlayerInfo.player.gravatarEmail).toString();
    const rankPlayer = {
      name: savePlayerInfo.player.name,
      score: savePlayerInfo.player.score,
      picture: `https://www.gravatar.com/avatar/${hash}`,
    };
    savePlayerRankAct(rankPlayer);
    localStorage.setItem('ranking', JSON.stringify([...rankState, rankPlayer]));
  }

  render() {
    const { rankState } = this.props;
    const sortedRank = rankState.sort((a, b) => b.score - a.score);
    return (
      <div className="rankingContainer">
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
            className="homePlayBtn"
          >
            Jogar novamente
          </button>
        </Link>
        <div className="rankPlayersContainer">
          {sortedRank.map((item, index) => (
            <div key={ index }>
              <img src={ item.picture } alt="profile" />
              <h5 data-testid={ `player-name-${index}` }>{ item.name }</h5>
              <h5 data-testid={ `player-score-${index}` }>{ item.score }</h5>
              <hr className="rankHr" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  rankState: PropTypes.arrayOf(PropTypes.object).isRequired,
  savePlayerRankAct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rankState: state.rankingReducer.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  savePlayerRankAct: (playerObj) => dispatch(savePlayerToRank(playerObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
