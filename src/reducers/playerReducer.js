import { REQUEST_TOKEN, SEND_SCORE } from '../actions';

const INITIAL_STATE = { name: '', gravatarEmail: '', assertions: 0, score: 0 };

function playerReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_TOKEN:
    return {
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
      assertions: payload.assertions,
      score: payload.score,
    };
  case SEND_SCORE:
    return {
      ...state,
      score: payload.score,
    };
  default:
    return state;
  }
}

export default playerReducer;
