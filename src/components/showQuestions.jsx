/* eslint-disable max-lines-per-function */
import React from 'react';

const showQuestions = (arrayQuestions, onChange) => arrayQuestions.map((el, index) => {
  if (typeof el === 'string') {
    return (
      <label
        id={ `label${index}` }
        htmlFor={ `question-${index}` }
        key={ index }
        className="btn btn-lg btn-primary btn-block"
        data-testid={ `wrong-answer-${index}` }
      >
        <span className="btn-label" />
        <input
          id={ `question-${index}` }
          type="radio"
          name="q_answer"
          value={ el }
          onChange={ () => {
            onChange(el);
          } }
        />
        {el}
      </label>
    );
  }
  return (
    <label
      id={ `label${index}` }
      htmlFor={ `question-${index}` }
      key={ index }
      className="btn btn-lg btn-primary btn-block"
      data-testid="correct-answer"
    >
      <span className="btn-label" />
      <input
        id={ `question-${index}` }
        type="radio"
        name="q_answer"
        value={ el.correct }
        onChange={ () => {
          onChange(el.correct);
        } }
      />
      {el.correct}
    </label>
  );
});

export default showQuestions;
