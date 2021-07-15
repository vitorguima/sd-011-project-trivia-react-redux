/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import showQuestions from './showQuestions';
import NextQuestionButton from './NextQuestionButton';
import Timer from './Timer';

export default function ShowTrivia(props) {
  const { index,
    questions,
    arrayQuestions,
    showResults,
    answer,
    setAnswer,
    setIndex,
    setPlayer,
    player,
    count,
    setCount,
    setCounter,
    counter } = props;

  return (
    <div className="modal-dialog">
      <Timer {...{ count, counter, setCounter }} />
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
        {arrayQuestions && showQuestions(arrayQuestions, showResults, setCount)}
        {(answer || counter === 0)
          && (<NextQuestionButton {...{ setAnswer, index, questions, setIndex, answer, player, setPlayer, setCount, setCounter }} />)}
        <div className="modal-footer text-muted">
          <span id="answer" />
        </div>
      </div>
    </div>
  );
}
ShowTrivia.propTypes = {
  index: PropTypes.number.isRequired,
  questions: PropTypes.objectOf(PropTypes.object).isRequired,
  arrayQuestions: PropTypes.shape({}).isRequired,
  answer: PropTypes.objectOf(PropTypes.object).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  showResults: PropTypes.func.isRequired,
  setAnswer: PropTypes.func.isRequired,
  setPlayer: PropTypes.func.isRequired,
  player: PropTypes.objectOf(PropTypes.object).isRequired,

};
