import {
  GRAVATAR_IMAGE,
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS_ERROR,
  HANDLE_ANSWERS_BUTTONS,
  UPDATE_SCORE,
  QUESTION_DIFFICULTY, } from '../actions/game';

const INITIAL_STATE = {
  gravatarImage: '',
  questions: [],
  answerButtons: false,
  score: 0,
  difficulty: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GRAVATAR_IMAGE:
    return {
      ...state,
      gravatarImage: action.payload,
    };
  case REQUEST_QUESTIONS:
    return {
      ...state,
    };
  case REQUEST_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload.results,
    };
  case REQUEST_QUESTIONS_ERROR:
    return {
      ...state,
      error: action.payload.error,
    };
  case HANDLE_ANSWERS_BUTTONS:
    return {
      ...state,
      answerButtons: action.payload,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case QUESTION_DIFFICULTY:
    return {
      ...state,
      difficulty: action.payload,
    };
  default:
    return state;
  }
};

export default game;
