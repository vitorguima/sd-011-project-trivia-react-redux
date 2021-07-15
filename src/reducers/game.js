import { GET_TOKEN, GET_TOKEN_SUCCESS, GET_TOKEN_FAILED } from '../actions';

const INITIAL_STATE = {
  token: '',
  loading: true,
  pontuation: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state, loading: true,
    };
  case GET_TOKEN_SUCCESS:
    return { ...state,
      token: action.payload.token,
      loading: false,
    };
  case GET_TOKEN_FAILED:
    return { ...state, error: action.payload };
  default:
    return state;
  }
};

export default game;
