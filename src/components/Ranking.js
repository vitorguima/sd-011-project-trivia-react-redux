import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map(({ name, score, picture }, index) => (
          <div key={ picture }>
            <img src={ picture } alt="gravatar" />
            <span data-testid={ `player-name-${index}` }>{name}</span>
            <span data-testid={ `player-score-${index}` }>
              {score}
            </span>
          </div>
        ))}
        <Link data-testid="btn-go-home" to="/">
          Home
        </Link>
      </div>
    );
  }
}
