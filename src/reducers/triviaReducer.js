import {
  TRIVIA_REQUEST,
  FAILED_TRIVIA_REQUEST,
  GET_TRIVIA,
} from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  trivia: {},
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TRIVIA_REQUEST:
    return { ...state, loading: true };
  case FAILED_TRIVIA_REQUEST:
    return { ...state, error: action.error, loading: false };
  case GET_TRIVIA:
    return { ...state, trivia: action.json, loading: false };
  default:
    return state;
  }
}

export default triviaReducer;
