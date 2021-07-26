import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../CSS/Ranking.css';
import '../CSS/Home.css';

export default class Ranking extends Component {
  render() {
    const rankingStorage = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking-control">
        <h2 data-testid="ranking-title">Ranking</h2>
        <div>
          { rankingStorage.sort((a, b) => b.score - a.score).map((item, index) => (
            <div key={ index }>
              <img src={ item.picture } alt={ item.name } />
              <h3 data-testid={ `player-name-${index}` }>{item.name}</h3>
              <p data-testid={ `player-score-${index}` }>{item.score}</p>
            </div>
          )) }
        </div>

        <div>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
              className="buttons"
            >
              Inicio
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
