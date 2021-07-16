import React from 'react';
import { useSelector } from 'react-redux';

export default function ShowQuestion() {
  const gameState = useSelector((state) => state.game);
  const { currentQuestion, index } = gameState;
  const { question } = currentQuestion;

  return (
    <div>
      <p data-testid="question-category">{currentQuestion.category}</p>
      <h3>
        <span className="label label-warning gameIndex" data-testid="question-text">
          {index + 1}
        </span>
        {question}
      </h3>
    </div>);
}
