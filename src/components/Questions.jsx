/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { addScore } from './GameFunctions';

export default function Questions(props) {
  const { questions, index, player, setPlayer, counter, arrayQuestions, showResults, setCount } = props;
  const [array, setArray] = useState('');

  useEffect(() => {
    setArray(arrayQuestions);
  }, [arrayQuestions, array]);

  const showQuestions = () => {
    if (array) {
      return array.map((el, idx) => {
        if (typeof el === 'string') {
          return (
            <button
              data-testid={ `wrong-answer-${idx}` }
              className="btn btn-lg btn-primary btn-block"
              id={ `question-${idx}` }
              type="button"
              name="q_answer"
              onClick={ () => {
                showResults(el);
                setCount(false);
                addScore({ questions, index, el, player, setPlayer, counter });
              } }
            >
              {el}
            </button>
          );
        }
        return (
          <button
            key={ idx }
            data-testid="correct-answer"
            className="btn btn-lg btn-primary btn-block"
            id={ `question-${idx}` }
            type="button"
            name="q_answer"
            onClick={ () => {
              const { correct } = el;
              showResults(el.correct);
              setCount(false);
              addScore({ questions, index, correct, player, setPlayer, counter });
            } }
          >
            {el.correct}
          </button>
        );
      });
    }
  };
  return (
    <>{showQuestions()}</>
  );
}
