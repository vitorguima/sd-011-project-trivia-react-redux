/* eslint-disable max-lines-per-function */
import React from 'react';
import { useHistory } from 'react-router-dom';

const showQuestions = (arrayQuestions, onChange, i) => arrayQuestions.map((el, index) => {
  const history = useHistory();
  if (typeof el === 'string') {
    return (
      <label
        id={`label${index}`}
        htmlFor={`question-${index}`}
        key={index}
        className="btn btn-lg btn-primary btn-block"
        data-testid={`wrong-answer-${index}`}
      >
        <span className="btn-label" />
        <input
          id={`question-${index}`}
          type="radio"
          name="q_answer"
          value={el}
          onChange={() => {
            onChange(el);
            if (i === arrayQuestions.length) {
              return history.push('feedback');
            }
          }}
        />
        {el}
      </label>
    );
  }
  return (
    <label
      id={`label${index}`}
      htmlFor={`question-${index}`}
      key={index}
      className="btn btn-lg btn-primary btn-block"
      data-testid="correct-answer"
    >
      <span className="btn-label" />
      <input
        id={`question-${index}`}
        type="radio"
        name="q_answer"
        value={el.correct}
        onChange={() => {
          // onChange({ answer: el.correct, id: index });
          onChange(el.correct);
          if (i === arrayQuestions.length) {
            return history.push('feedback');
          }
        }}
      />
      {el.correct}
    </label>
  );
});

export default showQuestions;
