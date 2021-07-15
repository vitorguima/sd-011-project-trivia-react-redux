import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import '../styles/TriviaGame.css';
import { getQuestions } from '../services/mockedTriviaResults';
import { Header, Functions } from '../components';

export default function Game() {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState('');
  const [answer, setAnswer] = useState('');
  const [arrayQuestions, setArray] = useState('');

  const loginState = useSelector((state) => state.login);

  useEffect(async () => {
    (async () => {
      const { token } = loginState;
      const questions = await getQuestions(token);
      setQuestions(questions);
    })();
  }, []);

  useEffect(() => {
    if (questions) {
      const { incorrect_answers, correct_answer } = questions[index];
      let answers = Array.from(incorrect_answers);
      answers.push({ correct: correct_answer });
      answers = answers.sort(() => Math.random() - 0.5);
      setArray(answers);
    }
  }, [questions, index]);

  const nextQuestion = () => {
    setAnswer('');
    const ele = document.querySelector('input:checked');
    ele.checked = false;
    if (index < 4) {
      return setIndex(index + 1);
    }
    return setIndex(0);
  };

  const showTrivia = () => (
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>
            <span class="label label-warning gameIndex" id="qid" data-testid="question-text">
              {index + 1}
            </span>
            {questions[index].question}
          </h3>
          <p data-testid="question-category">{questions[index].category}</p>
        </div>
        {arrayQuestions && Functions.showQuestions(arrayQuestions, setAnswer)}

        {answer && (
          <button
            onClick={() => nextQuestion()}
            className="btn btn btn-success"
            data-testid="btn-next"
          >
            Próxima pergunta
          </button>
        )}

        <div class="modal-footer text-muted">
          <span id="answer"></span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      {questions && showTrivia()}
    </>
  );
}
