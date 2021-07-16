/* eslint-disable max-lines-per-function */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayerChoice } from '../actions/gameActions';

export default function ShowAlternatives() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const { currentQuestion } = gameState;
  const { alternatives, correctAnswer } = currentQuestion;

  const paintButton = () => {
    const allButtons = document.querySelectorAll('button');
    const btnPrimary = 'btn-primary';
    allButtons.forEach((el) => {
      el.classList.remove(btnPrimary);
      if (el.name === 'q_answer') {
        return el.innerText === correctAnswer ? el.classList.add('rightAnswer')
          : el.classList.add('wrongAnswer');
      }
    });
  };

  const checkAnswer = (e) => {
    dispatch(setPlayerChoice(e));
    paintButton();
  };

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
          onClick={ () => checkAnswer(el) }
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
