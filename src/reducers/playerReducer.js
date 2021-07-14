import { VALIDATE_LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  email: '',
  playerName: '',
  score: 0,
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case VALIDATE_LOGIN:
    return {
      ...state,
      email: action.email,
      playerName: action.playerName,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.score + 1,
    };
  default:
    return state;
  }
}

export default playerReducer;
