import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rquestQuestions, sendScorePoints } from '../../actions';
import ButtonNext from './ButtonNext';
import ButtonsQuestions from './ButtonsQuestions';
import ComponentTime from './ComponentTime';
import QuestionDesc from './QuestionDec';

const limitedTime = 1000;

const RenderQuestion = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector(({ questionsArray }) => questionsArray);
  const { name, gravatarEmail } = useSelector(({ userInfo }) => userInfo);
  const [enable, setEnable] = useState(false);
  const [answersYes, setAnswersYes] = useState(false);
  const [correctanswers, setCorrectanswers] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      dispatch(rquestQuestions());
    }, limitedTime);
  }, []);

  const globalScore = (score) => {
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: 0,
        score,
        gravatarEmail,
        token: '',
        ranking: [],
      },
    }));
    dispatch(sendScorePoints(score));
  };

  const renderResult = () => (
    <div className="question">
      <ComponentTime
        stateButtonsEnable={ setEnable }
        correctAsw={ correctanswers }
        idQuestion={ questions[0] }
        cancelSomeScore={ setCorrectanswers }
        sendScore={ globalScore }
      />
      <QuestionDesc descQuestion={ questions[0] } />
      <ButtonsQuestions
        descQuestion={ questions[0] }
        btnEnable={ enable }
        funcAnswersYes={ setAnswersYes }
        setCorrectAsw={ setCorrectanswers }
      />
      <ButtonNext stateAnswers={ answersYes } />
    </div>);
  return (questions[0] === undefined ? <div>Loading...</div> : renderResult());
};

export default RenderQuestion;
