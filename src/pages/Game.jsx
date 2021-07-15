/* eslint-disable max-lines-per-function */
import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import '../styles/TriviaGame.css';
import getQuestions from '../services/mockedTriviaResults';
import { Header, Functions, ShowTrivia } from '../components';

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

  const btnPrimary = 'btn-primary';

  const showResults = (e) => {
    setAnswer(e);
    const labelAnswers = document.querySelectorAll('label');
    const correctAnswer = arrayQuestions.find((el) => typeof el === 'object');
    const correctIndex = arrayQuestions.indexOf(correctAnswer);
    return labelAnswers.forEach((el) => {
      const id = el.id.replace('label', '');
      if (parseInt(id, 10) !== correctIndex) {
        el.classList.add('btn-danger', 'wrongAnswer');
        el.classList.remove(btnPrimary);
      }
      if (parseInt(id, 10) === correctIndex) {
        el.classList.add('btn-success', 'rightAnswer');
        el.classList.remove(btnPrimary);
      }
    });
  };

  const nextQuestion = () => {
    setAnswer('');
    const label = document.querySelectorAll('label');
    const ele = document.querySelector('input:checked');
    label.forEach((el) => {
      el.classList.remove('btn-danger', 'btn-success', 'wrongAnswer', 'rightAnswer');
      el.classList.add(btnPrimary);
    });

    ele.checked = false;
    if (index < questions.length - 1) {
      return setIndex(index + 1);
    }
    return setIndex(0);
  };

  return (
    <>
      <Header />
      {questions && <ShowTrivia
        index={ index }
        questions={ questions }
        arrayQuestions={ arrayQuestions }
        Functions={ Functions }
        onChange={ showResults }
        answer={ answer }
        nextQuestion={ nextQuestion }
      />}

    </>
  );
}
