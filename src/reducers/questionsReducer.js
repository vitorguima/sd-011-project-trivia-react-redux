import { REQUEST_QUESTIONS, RECEIVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  response_code: '',
  results: [],
  isFetching: false,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_QUESTIONS:
    return {
      ...state,
      response_code: action.data.response_code,
      results: action.data.results,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default questionsReducer;
