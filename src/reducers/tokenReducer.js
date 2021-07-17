import {
  TOKEN_REQUEST,
  FAILED_TOKEN_REQUEST,
  GET_TOKEN,
} from '../actions/index';

const INITIAL_STATE = {
  token: '',
  error: '',
  loading: false,
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN_REQUEST:
    return { ...state, loading: true };
  case FAILED_TOKEN_REQUEST:
    return { ...state, error: action.error, loading: false };
  case GET_TOKEN:
    return { ...state, token: action.token, loading: false };
  default:
    return state;
  }
}

export default tokenReducer;
