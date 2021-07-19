import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const getLocalStorage = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          { getLocalStorage.sort((a, b) => (b.score - a.score))
            .map((value, index) => (
              <div key={ index }>
                <p data-testid={ `player-name-${index}` }>{ value.name }</p>
                <p data-testid={ `player-score-${index}` }>{ value.score }</p>
                <img src={ value.picture } alt={ value.name } />
              </div>
            ))}
        </div>
        Lista de Ranking
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Início</button>
        </Link>
      </div>
    );
  }
}
