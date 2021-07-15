import {
  GRAVATAR_IMAGE,
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS_ERROR } from '../actions/game';

const INITIAL_STATE = {
  gravatarImage: '',
  questions: [],
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
  default:
    return state;
  }
};
// [...state.questions,

export default game;
