import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Header from '../components/Header';

const Feedback = () => {
  const history = useHistory();
  const { score } = useSelector(({ userInfo }) => userInfo.player);

  return (
    <>
      <Header />
      <div data-testid="feedback-text">{ score }</div>
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ () => { history.push('/feedback'); } }
      >
        Jogar novamente
      </button>
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ () => { history.push('/ranking'); } }
      >
        Ver Ranking
      </button>
    </>
  );
};

export default Feedback;
