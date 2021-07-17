import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Ranking.css';

export default class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);

    return (
      <div className="ranking-container">
        <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
        <Link className="home-btn" data-testid="btn-go-home" to="/">
          Home
        </Link>
        {ranking.map(({ name, score, picture }, index) => (
          <div className="user-container" key={ picture }>
            <img className="user-img" src={ picture } alt="gravatar" />
            <p>
              <span className="user-name" data-testid={ `player-name-${index}` }>
                {name}
              </span>
            </p>
            <p>
              {'Score: '}
              <span data-testid={ `player-score-${index}` }>{score}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
}
