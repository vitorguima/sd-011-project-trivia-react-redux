import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cleanState } from '../actions/gameActions';
import RankingForm from '../components/RankingForm';

export default function Ranking() {
  const history = useHistory();
  const dispatch = useDispatch();
  const getStorageRankings = () => {
    let { ranking } = localStorage;
    ranking = JSON.parse(ranking).sort((a, b) => b.score - a.score);
    return ranking.map((el, index) => <RankingForm { ...el } index={ index } />);
  };

  return (
    <div data-testid="ranking-title">
      <h1>Trivia Ranking</h1>
      {getStorageRankings()}

      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ () => {
          history.push('/');
          dispatch(cleanState());
        } }
      >
        Voltar para Home
      </button>
    </div>
  );
}
