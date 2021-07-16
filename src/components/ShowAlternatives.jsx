import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addScore } from './GameFunctions';

export default function ShowAlternatives() {
  const gameState = useSelector((state) => state.game);
  const { currentQuestion } = gameState;
  const { alternatives, correctAnswer } = currentQuestion;

  const showAlternatives = () => {
    if (alternatives) {
      return alternatives.map((el, index) => (
        <button
          key={index}
          data-testid={
            el !== correctAnswer ? `wrong-answer-${index}` : 'correct-answer'
          }
          className="btn btn-lg btn-primary btn-block"
          id={`question-${index}`}
          type="button"
          name="q_answer"
          onClick={(e) => {
            // showResults(el);
            // setCount(false);
            addScore(e);
          }}
        >
          {el}
        </button>
      ));
    }
  };

  return (
    <>
      {showAlternatives()}
    </>
  );
}
