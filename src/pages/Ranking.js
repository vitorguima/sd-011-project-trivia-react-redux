import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {
            ranking.sort((a, b) => b.score - a.score)
              .map((user, index) => (
                <li key={ index }>
                  <img src={ user.picture } alt={ user.name } />
                  <p data-testid={ `player-name-${index}` }>{user.name}</p>
                  <p data-testid={ `player-score-${index}` }>{user.score}</p>
                </li>
              ))
          }
        </ol>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar para tela inicial
          </button>
        </Link>
      </div>
    );
  }
}
