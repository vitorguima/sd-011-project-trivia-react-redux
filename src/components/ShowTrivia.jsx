/* eslint-disable react/prop-types */
import React from 'react';

export default function ShowTrivia({
  index,
  questions,
  arrayQuestions,
  Functions,
  onChange,
  answer,
  nextQuestion,
}) {
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            <span className="label label-warning gameIndex" data-testid="question-text">
              {index + 1}
            </span>
            {questions[index].question}
          </h3>
          <p data-testid="question-category">{questions[index].category}</p>
        </div>
        {arrayQuestions && Functions.showQuestions(arrayQuestions, onChange)}

        {answer && (
          <button
            type="button"
            onClick={ () => nextQuestion() }
            className="btn btn btn-info btn-lg nextQuestion"
            data-testid="btn-next"
          >
            Próxima pergunta
          </button>
        )}

        <div className="modal-footer text-muted">
          <span id="answer" />
        </div>
      </div>
    </div>
  );
}
