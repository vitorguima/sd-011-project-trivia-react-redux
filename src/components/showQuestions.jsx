/* eslint-disable max-lines-per-function */
import React from 'react';
import { addScore } from './GameFunctions';

const showQuestions = (arrayQuestions, onChange, setCount, props) =>
  arrayQuestions.map((el, idx) => {
    const { questions, index, answer, player, setPlayer, counter } = props;
    if (typeof el === 'string') {
      return (
        <button
          data-testid={`wrong-answer-${idx}`}
          className="btn btn-lg btn-primary btn-block"
          id={`question-${idx}`}
          type="button"
          name="q_answer"
          onClick={() => {
            onChange(el);
            setCount(false);
            addScore(questions, index, el, player, setPlayer, counter)
          }}
        >
          {el}
        </button>
      );
    }
    return (
      <button
        key={idx}
        data-testid="correct-answer"
        className="btn btn-lg btn-primary btn-block"
        id={`question-${idx}`}
        type="button"
        name="q_answer"
        onClick={() => {
          onChange(el.correct);
          setCount(false);
          addScore(questions, index, el.correct, player, setPlayer, counter)
        }}
      >
        {el.correct}
      </button>
    );
  });

export default showQuestions;
