import React from 'react';

export const showQuestions = (answers, setAnswer) => {
  return answers.map((el, index) => {
    if (typeof el === 'string') {
      return (
        <label
          key={index}
          class="element-animation1 btn btn-lg btn-primary btn-block"
          data-testid={`wrong-answer-${index}`}
        >
          <span class="btn-label">
            <i class="glyphicon glyphicon-chevron-right"></i>
          </span>
          <input
            type="radio"
            name="q_answer"
            value={el}
            onChange={() => {
              console.log('teste');
              setAnswer(el);
            }}
          />
          {el}
        </label>
      );
    }
    return (
      <label
        key={index}
        class="element-animation1 btn btn-lg btn-primary btn-block"
        data-testid="correct-answer"
      >
        <span class="btn-label">
          <i class="glyphicon glyphicon-chevron-right"></i>
        </span>
        <input
          type="radio"
          name="q_answer"
          value={el.correct}
          onChange={() => {
            console.log('teste');
            setAnswer(el.correct);
          }}
        />
        {el.correct}
      </label>
    );
  });
};

export default { showQuestions };
