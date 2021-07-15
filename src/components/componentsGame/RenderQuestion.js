import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rquestQuestions } from '../../actions';
import ButtonNext from './ButtonNext';
import ButtonsQuestions from './ButtonsQuestions';
import ComponentTime from './ComponentTime';
import QuestionDesc from './QuestionDec';

const RenderQuestion = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector(({ questionsArray }) => questionsArray);
  const [enable, setEnable] = useState(false);
  const [answersYes, setAnswersYes] = useState(false);
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
      <ButtonsQuestions
        descQuestion={ questions[0] }
        btnEnable={ enable }
        funcAnswersYes={ setAnswersYes }
      />
      <ButtonNext stateAnswers={ answersYes } />
    </div>);
  return (questions[0] === undefined ? <div>Loading...</div> : renderResult());
};

export default RenderQuestion;
