import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {ranking.map((element, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>{element.username}</p>
              <p data-testid={ `player-score-${index}` }>{element.score}</p>
              <img src={ element.avatar } alt="Foto do jogador" />
            </li>))}
        </ol>
        <Link to="/" data-testid="btn-go-home">
          Tela inicial
        </Link>
      </div>
    );
  }
}

export default Ranking;
