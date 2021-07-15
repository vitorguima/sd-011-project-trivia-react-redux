import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rquestQuestions } from '../../actions';
import ButtonsQuestions from './ButtonsQuestions';
import ComponentTime from './ComponentTime';
import QuestionDesc from './QuestionDec';
// Random questions https://stackoverflow.com/questions/59329807/react-map-function-return-one-item-at-random

const RenderQuestion = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector(({ questionsArray }) => questionsArray);
  const [enable, setEnable] = useState(false);
  const renderOptionsQuetion = () => {
    const limitedTime = 1000;
    setTimeout(() => {
      dispatch(rquestQuestions());
    }, limitedTime);
  };
  useEffect(() => {
    renderOptionsQuetion();
  }, []);
  const renderResult = () => (
    <div className="question">
      <ComponentTime stateButtonsEnable={ setEnable } />
      <QuestionDesc descQuestion={ questions[0] } />
      <ButtonsQuestions descQuestion={ questions[0] } btnEnable={ enable } />
    </div>);
  return (questions[0] === undefined ? <div>Loading...</div> : renderResult());
};

export default RenderQuestion;
