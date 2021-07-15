import {
  REQUEST_TRIVIA,
  REQUEST_TRIVIA_SUCCESS,
  REQUEST_TRIVIA_ERROR,
} from '../actions';

const INITIAL_STATE = {
  error: '',
  questions: [],
  isLoading: true,
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TRIVIA:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_TRIVIA_SUCCESS:
    return {
      ...state,
      questions: action.state,
      isLoading: false,
    };
  case REQUEST_TRIVIA_ERROR:
    return {
      ...state,
      isLoading: true,
      error: action.state,
    };
  default:
    return state;
  }
}

export default triviaReducer;
