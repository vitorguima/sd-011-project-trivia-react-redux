import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../components';

export default function Feedback() {
  const correctAnswers = useSelector((state) => state.player.state);
  const { assertions, score } = correctAnswers;
  const parameterNumber = 3;

  const showFeedbackMessage = (hits) => {
    if (hits < parameterNumber) return 'Podia ser melhor...';
    if (hits >= parameterNumber) return 'Mandou bem!';
  };

  return (
    <div>
      <Header />
      <div>
        <p data-testid="feedback-text">{showFeedbackMessage(assertions)}</p>
        <p data-testid="feedback-total-score">{`Score final: ${score}`}</p>
        <p data-testid="feedback-total-question">{`Acertou: ${assertions} perguntas`}</p>
      </div>
    </div>
  );
}
