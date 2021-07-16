import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
    this.handleClickPlayAgain = this.handleClickPlayAgain.bind(this);
  }

  componentDidMount() {
    this.sortRanking();
  }

  handleClickPlayAgain() {
    const { history } = this.props;
    history.push('/');
  }

  sortRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    const scoreArray = [ranking
      .map((players) => players
        .map((player) => player.score))];
    const sortedScoreArray = scoreArray[0].sort((a, b) => b - a);
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <Header />
        <h2 data-testid="ranking-title">Ranking</h2>
        <h3>
          { ranking && ranking.map((players) => players.map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt={ player.name } />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </div>
          )))}
        </h3>
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

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.string.isRequired,
};
