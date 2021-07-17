import React, { Component } from 'react';

const playersStorage = [
  {
    nome: 'Heyynat',
    score: 26,
  },
  {
    nome: 'matheusss',
    score: 16,
  },
];

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          playersStorage.sort((a, b) => a.score - b.score).reverse()
            .map((player, index) => (
              <div key={ index }>
                <p data-testid={ `player-name-${index}` }>{player.nome}</p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </div>))
        }
      </div>
    );
  }
}

export default Ranking;
