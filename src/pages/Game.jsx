import React, { useEffect, useState, Fragment } from 'react';
import _ from 'lodash';
import '../styles/TriviaGame.css';
import { getQuestions } from '../services/mockedTriviaResults';
import { Header } from '../components';

export default function Game() {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState('');

  useEffect(async () => {
    (async () => {
      const questions = await getQuestions();
      setQuestions(questions);
    })();
  }, []);

  useEffect(() => {}, [index]);

  const showQuestions = () => {
    const { incorrect_answers, correct_answer } = questions[index];

    if (questions[index]) {
      let answers = Array.from(incorrect_answers);
      answers.push({ correct: correct_answer });
      answers = answers.sort(() => Math.random() - 0.5);

      return answers.map((el, index) => {
        if (typeof el === 'string') {
          return (
            <label
              class="element-animation1 btn btn-lg btn-primary btn-block"
              data-testid={`wrong-answer-${index}`}
            >
              <span class="btn-label">
                <i class="glyphicon glyphicon-chevron-right"></i>
              </span>
              <input type="radio" name="q_answer" value={el} />
              {el}
            </label>
          );
        }
        return (
          <label
            class="element-animation1 btn btn-lg btn-primary btn-block"
            data-testid="correct-answer"
          >
            <span class="btn-label">
              <i class="glyphicon glyphicon-chevron-right"></i>
            </span>
            <input type="radio" name="q_answer" value={el.correct} />
            {el.correct}
          </label>
        );
      });
    }
  };

  const nextQuestion = () => {
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
        {showQuestions()}

        <button
          onClick={() => nextQuestion()}
          className="btn btn btn-success"
          data-testid="btn-next"
        >
          Próxima pergunta
        </button>
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

