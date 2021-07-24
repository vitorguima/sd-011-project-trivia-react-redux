import React, { Component } from 'react';
import { redirect } from '../services/getApi';

class Ranking extends Component {
  constructor() {
    super();
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    return (
      <ul className="ranking">
        { ranking
          .map((user, index) => (
            <li key={ index }>
              <img
                src={ user.picture }
                alt="avatar's search"
              />
              <span data-testid={ `player-name-${index}` }>
                {user.name}
              </span>
              <span data-testid={ `player-score-${index}` }>
                {user.score}
              </span>
            </li>
          ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <section>{ this.renderList() }</section>
        <button
          data-testid="btn-go-home"
          onClick={ () => redirect.call(this, '/') }
          type="button"
        >
          Ir para tela Inicial
        </button>
      </div>
    );
  }
}

export default Ranking;
