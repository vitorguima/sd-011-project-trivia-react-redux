import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const localRanking = JSON.parse(localStorage.ranking);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { localRanking
          .sort((a, b) => b.score - a.score)
          .map(({ name, score, userImage }, index) => (
            <div key={ index }>
              <img alt={ name } src={ userImage } />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </div>
          )) }
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Home
          </button>
        </Link>
      </div>
    );
  }
}
