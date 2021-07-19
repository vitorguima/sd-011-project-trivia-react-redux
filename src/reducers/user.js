import { GET_USER_INFO, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  user: {
    name: '',
    email: '',
    urlAvatar: '',
    score: 0,
    assertions: 0,
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER_INFO:
    return {
      ...state,
      user: action.payload,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      user: {
        ...state.user,
        score: action.payload.score,
        assertions: action.payload.assertions,
      },
    };
  default:
    return state;
  }
}

export default userReducer;
