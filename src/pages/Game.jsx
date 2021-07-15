import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/TriviaGame.css';
import getQuestions from '../services/mockedTriviaResults';
import { Header, showQuestions, ShowTrivia } from '../components';
import { paintButtons, nextQuestion, randomArray } from '../components/GameFunctions';

export default function Game() {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState('');
  const [answer, setAnswer] = useState('');
  const [arrayQuestions, setArray] = useState('');
  const loginState = useSelector((state) => state.login);

  useEffect(() => {
    (async () => {
      const { token } = loginState;
      const response = await getQuestions(token);
      setQuestions(response);
    })();
  }, []);

  useEffect(() => randomArray(questions, setArray, index), [questions, index]);

  const showResults = (e) => {
    setAnswer(e);
    paintButtons(arrayQuestions);
  };
  const props = { index,
    questions,
    arrayQuestions,
    showQuestions,
    showResults,
    answer,
    nextQuestion,
    setAnswer,
    setIndex };
  return (
    <>
      <Header />
      {questions && <ShowTrivia { ...props } />}

    </>
  );
}
