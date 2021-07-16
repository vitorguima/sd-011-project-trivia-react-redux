import { USER_LOGIN, USER_SCORE, PLAYER_HITS } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  hits: 0,
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
  case PLAYER_HITS:
    return {
      ...state,
      hits: action.hits,
    };
  default:
    return state;
  }
}

export default playerReducer;
