import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendScorePoints } from '../../actions';
import ButtonNext from './ButtonNext';
import ButtonsQuestions from './ButtonsQuestions';
import ComponentTime from './ComponentTime';
import QuestionDesc from './QuestionDec';

const RenderQuestion = () => {
  const dispatch = useDispatch();
  const initialTime = 30;
  const { questions } = useSelector(({ questionsArray }) => questionsArray);
  const { name, gravatarEmail, score } = useSelector(({ userInfo }) => userInfo.player);
  const [enable, setEnable] = useState(false);
  const [answersYes, setAnswersYes] = useState(false);
  const [correctanswers, setCorrectanswers] = useState(false);
  const [second, setSecond] = useState(initialTime);
  const [index, setIndex] = useState(0);
  const globalScore = (newScore) => {
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: newScore + score,
        gravatarEmail,
      },
    }));
    dispatch(sendScorePoints(newScore + score));
  };
  const renderResult = () => (
    <div className="question">
      <ComponentTime
        stateButtonsEnable={ setEnable }
        correctAsw={ correctanswers }
        idQuestion={ questions[index] }
        cancelSomeScore={ setCorrectanswers }
        sendScore={ globalScore }
        second={ second }
        funcSecond={ setSecond }
      />
      <QuestionDesc descQuestion={ questions[index] } />
      <ButtonsQuestions
        descQuestion={ questions[index] }
        btnEnable={ enable }
        funcAnswersYes={ setAnswersYes }
        setCorrectAsw={ setCorrectanswers }
      />
      <ButtonNext
        stateAnswers={ answersYes }
        nextFunc={ setIndex }
        indexNext={ index }
        setSecond={ setSecond }
      />
    </div>);
  return (questions[0] === undefined ? <div>Loading...</div> : renderResult());
};

export default RenderQuestion;
