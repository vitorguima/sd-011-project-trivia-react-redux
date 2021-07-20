import { SEND_RANKING } from '../actions';

const INITIAL_STATE = [];

const rankingReducer = (state = INITIAL_STATE, { type, payload }) => {
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
};

export default rankingReducer;
