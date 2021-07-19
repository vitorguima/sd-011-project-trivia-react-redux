import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const Feedback = () => {
  const history = useHistory();
  const { assertions } = useSelector(({ userInfo }) => userInfo.player);
  const actualAssertion = 3;
  function ReturnMessage() {
    if (assertions < actualAssertion) return 'Podia ser melhor...';
    if (assertions >= actualAssertion) return 'Mandou bem!';
  }
  return (
    <>
      <Header />
      <div data-testid="feedback-text">{ ReturnMessage() }</div>
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
