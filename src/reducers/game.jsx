/* eslint-disable import/no-cycle */
import { GET_ALL_QUESTIONS,
  CURRENT_QUESTION,
  NEXT_INDEX, SET_TIMER, SELECTED_CHOICE } from '../actions/gameActions';

import { randomArray } from '../components/GameFunctions';

const initialState = {
  allQuestions: {},
  index: 0,
  currentQuestion: {},
  timer: 30,
  selectedChoice: '' };

const gameReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case GET_ALL_QUESTIONS: {
    return { ...state, allQuestions: payload };
  }
  case CURRENT_QUESTION: {
    const { allQuestions, index } = state;
    const curr = allQuestions[index];
    const incorrectAnswers = curr.incorrect_answers;
    const correctAnswer = curr.correct_answer;
    const alternatives = randomArray(incorrectAnswers, correctAnswer);
    delete curr.incorrect_answers;
    delete curr.correct_answer;
    curr.alternatives = alternatives;
    return { ...state, currentQuestion: { ...curr, incorrectAnswers, correctAnswer } };
  }

  case NEXT_INDEX: {
    const { index } = state;
    return { ...state, index: index + 1 };
  }
  case SET_TIMER: {
    return { ...state, timer: payload };
  }
  case SELECTED_CHOICE: {
    return { ...state, selectedChoice: payload };
  }

  default:
    return { ...state };
  }
};

export default gameReducer;
