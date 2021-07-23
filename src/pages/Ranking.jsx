import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const localRanking = JSON.parse(localStorage.ranking);
    return (
      <div className="container-ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        { localRanking
          .sort((a, b) => b.score - a.score)
          .map(({ name, score, userImage }, index) => (
            <div className="ranking" key={ index }>
              <img alt={ name } src={ userImage } />
              <p className="player" data-testid={ `player-name-${index}` }>{name}</p>
              <p className="score-ranking" data-testid={ `player-score-${index}` }>
                Score:
                {score}
              </p>
            </div>
          )) }
        <Link to="/">
          <button className="btn-home" type="button" data-testid="btn-go-home">
            Home
          </button>
        </Link>
      </div>
    );
  }
}
