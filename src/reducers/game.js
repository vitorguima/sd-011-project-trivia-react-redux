import {
  REQUEST_QUESTIONS_SUCCESS,
} from '../actions';

const INITITAL_STATE = {
  results: {},
};

function Game(state = INITITAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS_SUCCESS:
    return {
      ...state,
      results: action.payload.results,
    };
  default:
    return state;
  }
}

export default Game;
