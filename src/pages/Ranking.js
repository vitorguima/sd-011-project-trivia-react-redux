import React from 'react';
import { useHistory } from 'react-router';

const Ranking = () => {
  const history = useHistory();
  let rankingResult = JSON.parse(localStorage.getItem('ranking'));
  rankingResult = rankingResult.sort((a, b) => b.score - a.score);
  return (
    <div>
      <h1 data-testid="ranking-title">RANKING</h1>
      {
        rankingResult.map((playerData, index) => (
          <div key={ index }>
            <div data-testid={ `player-name-${index}` }>{playerData.name}</div>
            <img src={ playerData.picture } alt={ playerData.name } />
            <div data-testid={ `player-score-${index}` }>
              {' '}
              { playerData.score }
            </div>
          </div>
        ))
      }
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ () => history.push('/') }
      >
        Voltar para a tela inicial
      </button>
    </div>
  );
};

export default Ranking;
