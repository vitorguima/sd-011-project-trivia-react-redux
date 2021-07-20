import React, { Component } from 'react';
import ButtonToRoutes from '../components/ButtonToRoutes';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        {
          ranking.sort((a, b) => b.score - a.score).map((player, index) => (
            <div
              key={ index }
            >
              <img
                src={ player.picture }
                alt={ `Imagem de ${player.name}` }
              />
              <p
                data-testid={ `player-name-${index}` }
              >
                { player.name }
              </p>
              <p
                data-testid={ `player-score-${index}` }
              >
                { player.score }
              </p>
              <ButtonToRoutes
                path="/"
                textValue="Jogar novamente"
                testid="btn-go-home"
              />
            </div>
          ))
        }
      </div>
    );
  }
}

export default Ranking;
