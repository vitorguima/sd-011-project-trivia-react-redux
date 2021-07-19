import React, { Component } from 'react';

export default class Ranking extends Component {
  render() {
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
      </div>
    );
  }
}
