/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { addScore, nextQuestion } from './GameFunctions';

export default function NextQuestionButton(props) {
  const { setAnswer, index, questions, setIndex, answer, player, setPlayer, setCount, setCounter } = props;
  const history = useHistory();
  const feedbackTransitor = (v) => {
    if (v === questions.length - 1) {
      history.push('feedback');
    }
  };

  return (
    <button
      type="button"
      onClick={() => {
        nextQuestion(setAnswer, index, questions, setIndex);
        feedbackTransitor(index);
        addScore(questions, index, answer, player, setPlayer);
        setCount(true);
        setCounter(5);
      }}
      className="btn btn btn-info btn-lg nextQuestion"
      data-testid="btn-next"
    >
      Próxima pergunta
    </button>
  );
}
