import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ranking extends Component {
  constructor() {
    super();
    this.redirectHomePage = this.redirectHomePage.bind(this);
  }

  redirectHomePage() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const finalRanking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = finalRanking.sort((a, b) => b.score - a.score);
    console.log('ranking sort:', sortRanking);
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        { sortRanking.map((player, index) => (
          <div key={ index }>
            <img
              src={ player.picture }
              alt="User Gravatar"
            />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectHomePage }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
