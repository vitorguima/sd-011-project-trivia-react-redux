import { VALIDATE_LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
  assertions: 0,
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case VALIDATE_LOGIN:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
      name: action.name,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  default:
    return state;
  }
}

export default playerReducer;
