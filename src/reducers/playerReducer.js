import { GET_LOGIN, GET_SCORE, GET_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: action.score,
    };
  default:
    return state;
  }
};

export default player;
