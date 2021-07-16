import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ShowAlternatives() {
  const gameState = useSelector((state) => state.game);
  const { currentQuestion } = gameState;
  const { alternatives, correctAnswer } = currentQuestion;

  const showAlternatives = () => {
    if (alternatives) {
      return alternatives.map((el, index) => (
        <button
          key={ index }
          data-testid={
            el !== correctAnswer ? `wrong-answer-${index}` : 'correct-answer'
          }
          className="btn btn-lg btn-primary btn-block"
          id={ `question-${index}` }
          type="button"
          name="q_answer"
          onClick={ () => {
          // showResults(el);
          // setCount(false);
          // addScore(scoreProps);
          } }
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
