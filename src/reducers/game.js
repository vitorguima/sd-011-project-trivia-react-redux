import {
  GRAVATAR_IMAGE,
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS_ERROR,
  HANDLE_ANSWERS_BUTTONS } from '../actions/game';

const INITIAL_STATE = {
  gravatarImage: '',
  questions: [],
  answerButtons: false,
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
  default:
    return state;
  }
};
// [...state.questions,

export default game;
