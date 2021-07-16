import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cleanState } from '../actions/gameActions';

export default function Ranking() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div data-testid="ranking-title">
      My Ranking Page
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
