import React from 'react';

export default function AlternativesButton(props) {
  const [idx, el, showResults, setCount, addScore, addProps] = props;
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
        addScore(addProps);
      } }
    >
      {el}
    </button>
  );
}
