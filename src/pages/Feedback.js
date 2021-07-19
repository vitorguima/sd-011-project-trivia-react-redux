import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const Feedback = () => {
  const history = useHistory();
  const { assertions, score } = useSelector(({ userInfo }) => userInfo.player);
  const actualAssertion = 3;
  function ReturnMessage() {
    if (assertions < actualAssertion) return 'Podia ser melhor...';
    if (assertions >= actualAssertion) return 'Mandou bem!';
  }
  return (
    <>
      <Header />
      <div data-testid="feedback-text">{ ReturnMessage() }</div>
      <div data-testid="feedback-total-score">{ score }</div>
      <div data-testid="feedback-total-question">{ assertions }</div>
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ () => { history.push('/'); } }
      >
        Jogar novamente

      </button>
    </>
  );
};

export default Feedback;
