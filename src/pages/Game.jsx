import React, { useEffect, useState, createContext, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/TriviaGame.css';
import getQuestions from '../services/mockedTriviaResults';
import { Header, showQuestions, ShowTrivia } from '../components';
import { paintButtons, nextQuestion, randomArray } from '../components/GameFunctions';

export const GameStateContext = createContext({});

export default function Game() {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState('');
  const [answer, setAnswer] = useState('');
  const [arrayQuestions, setArray] = useState('');
  const [state, setState] = useState('');

  const loginState = useSelector((state) => state.login);

  useEffect(() => {
    (async () => {
      const { token } = loginState;
      const response = await getQuestions(token);
      setQuestions(response);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { email, name } = loginState;
      const state = {
        name: name,
        gravatarEmail: email,
        assertions: 0,
        score: 0,
      }
      setState({ player: state });
    })()
  }, []);

  useEffect(() => {
    localStorage.state = JSON.stringify(state);
  }, [state])

  useEffect(() => randomArray(questions, setArray, index), [questions, index]);

  const showResults = (e) => {
    setAnswer(e);
    paintButtons(arrayQuestions);
  };

  const props = {
    index,
    questions,
    arrayQuestions,
    showQuestions,
    showResults,
    answer,
    nextQuestion,
    setAnswer,
    setIndex,
    setState,
    state,
  };

  return (
    <>
      <Header />
      {questions && <ShowTrivia {...props} />}

    </>
  );
}

