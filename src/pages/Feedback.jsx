import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header } from '../components';

export default function Feedback() {
  const correctAnswers = useSelector((state) => state.player.state);
  const { assertions, score } = correctAnswers;
  const parameterNumber = 3;
  const history = useHistory();

  const showFeedbackMessage = (hits) => {
    if (hits < parameterNumber) return 'Podia ser melhor...';
    if (hits >= parameterNumber) return 'Mandou bem!';
  };

  return (
    <div>
      <Header />
      <div className="feedback-container">
        <h2>Score final</h2>
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h2>Total de acertos</h2>
        <h3 data-testid="feedback-total-question">{assertions}</h3>
        <h2 data-testid="feedback-text">{showFeedbackMessage(assertions)}</h2>
      </div>
      <button
        type="button"
        onClick={ () => history.push('/ranking') }
        data-testid="btn-ranking"
      >
        Ver Ranking
      </button>
    </div>
  );
}
