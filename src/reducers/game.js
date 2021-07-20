import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS_ERROR,
  UPDATE_SCORE,
  RESET_PLAYER_INFO } from '../actions/game';

const INITIAL_STATE = {
  questions: [],
  score: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case RESET_PLAYER_INFO:
    return {
      ...state,
      questions: [],
      score: 0,
    };
  default:
    return state;
  }
};

export default game;
