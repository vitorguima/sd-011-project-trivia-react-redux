import React, { useEffect, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import '../styles/TriviaGame.css';
import getQuestions from '../services/mockedTriviaResults';
import { Header, showQuestions, ShowTrivia } from '../components';
import { paintButtons, nextQuestion } from '../components/GameFunctions';

export const GameStateContext = createContext({});

export default function Game() {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState('');
  const [answer, setAnswer] = useState('');
  const [arrayQuestions, setArray] = useState('');
  const loginState = useSelector((state) => state.login);

  useEffect(async () => {
    (async () => {
      const { token } = loginState;
      const response = await getQuestions(token);
      setQuestions(response);
    })();
  }, []);

  useEffect(() => {
    const magic = 0.5;

    if (questions) {
      const incorrectAnswers = questions[index].incorrect_answers;
      const correctAnswers = questions[index].correct_answer;
      let answers = Array.from(incorrectAnswers);
      answers.push({ correct: correctAnswers });
      answers = answers.sort(() => Math.random() - magic);
      setArray(answers);
    }
  }, [questions, index]);

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
