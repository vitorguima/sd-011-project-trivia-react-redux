/* eslint-disable react/prop-types */
/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import NextQuestionButton from './NextQuestionButton';
import Timer from './Timer';
import { getCurrentQuestion } from '../actions/gameActions';
import ShowQuestion from './ShowQuestion';
import ShowAlternatives from './ShowAlternatives';
// import Questions from './Questions';

export default function ShowTrivia() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const { allQuestions, index } = gameState;

  useEffect(() => {
    if (Object.keys(allQuestions).length > 1) { dispatch(getCurrentQuestion()); }
  }, [allQuestions, index]);

  return (
    <div className="modal-dialog">
      {/* <Timer /> */}
      <div className="modal-content">
        <div className="modal-header">
          <ShowQuestion />
        </div>
        <ShowAlternatives />
        <NextQuestionButton />
        <div className="modal-footer text-muted">
          <span id="answer" />
        </div>
      </div>
    </div>
  );
}
// ShowTrivia.propTypes = {
//   index: PropTypes.number.isRequired,
//   questions: PropTypes.objectOf(PropTypes.object).isRequired,
//   arrayQuestions: PropTypes.shape({}).isRequired,
//   answer: PropTypes.objectOf(PropTypes.object).isRequired,
//   nextQuestion: PropTypes.func.isRequired,
//   setIndex: PropTypes.func.isRequired,
//   showResults: PropTypes.func.isRequired,
//   setAnswer: PropTypes.func.isRequired,
//   setPlayer: PropTypes.func.isRequired,
//   player: PropTypes.objectOf(PropTypes.object).isRequired,
// };
