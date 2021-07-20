import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
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
            </div>
          ))
        }
      </div>
    );
  }
}

export default Ranking;
