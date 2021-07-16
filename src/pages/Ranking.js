import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  getRanking() {
    const { ranking } = JSON.parse(localStorage.ranking);
    return ranking;
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <section>
        <h2 data-testid="ranking-title">Ranking</h2>
        {ranking ? [...ranking.sort((a, b) => (
          b.score - a.score))]
          .map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt="Player" />
              <span data-testid={ `player-name-${index}` }>
                {player.name}
              </span>
              <span data-testid={ `player-score-${index}` }>
                {player.score}
              </span>
            </div>
          )) : <span>Deu ruim</span>}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Jogar novamente
          </button>
        </Link>
      </section>
    );
  }
}
