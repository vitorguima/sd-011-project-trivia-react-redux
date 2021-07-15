/* eslint-disable max-lines-per-function */
import React from 'react';

const showQuestions = (arrayQuestions, onChange, setCount) =>
  arrayQuestions.map((el, index) => {
    if (typeof el === 'string') {
      return (
        <button
          data-testid={`wrong-answer-${index}`}
          className="btn btn-lg btn-primary btn-block"
          id={`question-${index}`}
          type="button"
          name="q_answer"
          onClick={() => {
            onChange(el);
            setCount(false);
          }}
        >
          {el}
        </button>
      );
    }
    return (
      <button
        key={index}
        data-testid="correct-answer"
        className="btn btn-lg btn-primary btn-block"
        id={`question-${index}`}
        type="button"
        name="q_answer"
        onClick={() => {
          onChange(el.correct);
          setCount(false);
        }}
      >
        {el.correct}
      </button>
    );
  });

export default showQuestions;
