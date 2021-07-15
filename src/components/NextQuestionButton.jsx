/* eslint-disable react/prop-types */
import React from 'react';
import { nextQuestion } from './GameFunctions';

export default function NextQuestionButton(props) {
  const { setAnswer, index, questions, setIndex } = props;
  return (
    <button
      type="button"
      onClick={ () => {
        nextQuestion(setAnswer, index, questions, setIndex);
        addScore();
      } }
      className="btn btn btn-info btn-lg nextQuestion"
      data-testid="btn-next"
    >
      Próxima pergunta
    </button>
  );
}
