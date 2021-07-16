import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { nextIndex, setTimer, setPlayerChoice } from '../actions/gameActions';

const magicNumber = 30;

export default function NextQuestionButton() {
  const dispatch = useDispatch();

  const history = useHistory();
  const gameState = useSelector((state) => state.game);
  const { allQuestions, index, timer, selectedChoice } = gameState;

  const changeIndex = () => {
    if (index < allQuestions.length - 1) {
      return dispatch(nextIndex());
    }

    history.push('/feedback');
  };

  const resetConfig = () => {
    dispatch(setTimer(magicNumber));
    dispatch(setPlayerChoice(''));
    const allButtons = document.querySelectorAll('button');
    return allButtons.forEach((el) => {
      el.removeAttribute('disabled');
      el.classList.remove('btn-danger', 'btn-success', 'wrongAnswer', 'rightAnswer');
      el.classList.add('btn-primary');
    });
  };

  if (timer === 0 || selectedChoice) {
    return (
      <button
        type="button"
        onClick={ () => {
          changeIndex();
          resetConfig();
        } }
        className="btn btn-info btn-lg nextQuestion"
        data-testid="btn-next"
      >
        Próxima pergunta
      </button>
    );
  }
  return null;
}
