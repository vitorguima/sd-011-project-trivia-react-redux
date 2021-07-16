import { USER_LOGIN, USER_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case USER_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
}

export default playerReducer;
