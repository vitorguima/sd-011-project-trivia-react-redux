import { sendScore } from '../actions';
import store from '../store';

const magicTen = 10;

export const setPlayerRanking = (state) => {
  const { hashEmail } = localStorage;
  const picture = `https://www.gravatar.com/avatar/${hashEmail}`;
  const { name, score } = state;
  const obj = { name, score, picture };
  if (localStorage.ranking) {
    const { ranking } = localStorage;
    const rankingParsed = JSON.parse(ranking);
    const newState = [...rankingParsed, obj];
    localStorage.ranking = JSON.stringify(newState);
  } else {
    localStorage.ranking = JSON.stringify([obj]);
  }
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

export const addScore = (e) => {
  const { state } = localStorage;
  const { currentQuestion, timer } = store.getState().game;
  const { difficulty, correctAnswer } = currentQuestion;
  const answer = e.target.innerText;
  const difficultyLevels = { easy: 1, medium: 2, hard: 3 };
  const { player } = JSON.parse(state);
  if (answer === correctAnswer) {
    const level = difficultyLevels[difficulty];
    let { assertions, score } = store.getState().player.state;
    assertions += 1;
    score += (magicTen + (timer * level));
    player.assertions = assertions;
    player.score = score;
    localStorage.state = JSON.stringify({ player });
    store.dispatch(sendScore({ assertions, score }));
  }
};
