import { SEND_RANKING } from '../actions';

INITIAL_STATE = [];

function boardRanking(state = INITIAL_STATE, { type, payload }) {
  localStorage.setItem('ranking', JSON.stringify({ ...state, ...payload }));

  switch (type) {
  case SEND_RANKING:
    return [
      ...state,
      {
        name: payload.name,
        score: payload.score,
        picture: payload.picture,
      },
    ];
  default:
    return state;
  }
}

export default boardRanking;
