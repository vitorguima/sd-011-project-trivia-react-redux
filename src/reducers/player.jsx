import { USER_INFO, SCORE_INFO } from '../actions';

const initialState = {
  state: {
    name: '',
    gravatarEmail: 'GET',
    assertions: 0,
    score: 0,
  },
};

const playerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case USER_INFO: {
    return { state: payload };
  }
  case SCORE_INFO: {
    const { score, assertions } = payload;
    return { ...state, state: { ...state.state, score, assertions } };
  }
  default:
    return { ...state };
  }
};

export default playerReducer;
