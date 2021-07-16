/* eslint-disable max-statements */
import { sendScore } from '../actions';
import store from '../store';

const magicTen = 10;

export const paintButtons = (array) => {
  const allButtons = document.querySelectorAll('button');
  const btnPrimary = 'btn-primary';
  const rightChoice = array.find((el) => typeof el === 'object');
  const correctIndex = array.indexOf(rightChoice);
  return allButtons.forEach((el) => {
    const id = el.id.replace('question-', '');
    if (parseInt(id, 10) !== correctIndex) {
      el.classList.add('wrongAnswer');
      el.classList.remove(btnPrimary);
    }
    if (parseInt(id, 10) === correctIndex) {
      el.classList.add('rightAnswer');
      el.classList.remove(btnPrimary);
    }
  });
};

export const nextQuestion = (setAnswer, index, questions, setIndex) => {
  const allButtons = document.querySelectorAll('button');
  const btnPrimary = 'btn-primary';
  setAnswer('');
  allButtons.forEach((el) => {
    el.classList.remove('btn-danger', 'btn-success', 'wrongAnswer', 'rightAnswer');
    el.classList.add(btnPrimary);
  });
  const allChecked = document.querySelectorAll('button:disabled');
  if (allChecked) {
    allChecked.forEach((el) => el.removeAttribute('disabled'));
  }
  if (index < questions.length - 1) {
    return setIndex(index + 1);
  }
  return setIndex(0);
};

export const randomArray = (incorrectAnswers, correctAnswer) => {
  const alternatives = Array.from([...incorrectAnswers, correctAnswer]);
  const magic = 0.5;
  const sortedArray = alternatives.sort(() => Math.random() - magic);
  return sortedArray;
};

export const addScore = (e) => {
  const { state } = localStorage;
  const { game } = store.getState();
  const { currentQuestion } = game;
  const { difficulty, correctAnswer } = currentQuestion;
  const answer = e.target.innerText;
  const difficultyLevels = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  const { player } = JSON.parse(state);
  if (answer === correctAnswer) {
    const level = difficultyLevels[difficulty];
    let { assertions, score } = store.getState().player.state;
    assertions += 1;
    score += (magicTen + (1 * level));
    player.assertions = assertions;
    player.score = score;
    localStorage.state = JSON.stringify({ player });
    store.dispatch(sendScore({ assertions, score }));
  }
};
