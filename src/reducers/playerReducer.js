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
  case SEND_SCORE: {
    const player = {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + payload.score,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
    return {
      ...state,
      assertions: state.assertions + 1,
      score: payload.score,
    }; }
  default:
    return state;
  }
}

export default playerReducer;
