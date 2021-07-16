import { FETCH_STARTED, FETCH_SUCCESS, FETCH_ERROR, GET_QUESTION } from '../actions';

const initialState = {
  token: '',
  isLoading: false,
  error: null,
  questions: [],
};

function questions(state = initialState, action) {
  switch (action.type) {
  case FETCH_STARTED:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_SUCCESS:
    return {
      ...state,
      token: action.payload,
      isLoading: false,
      error: null,
    };
  case FETCH_ERROR:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
      token: null,
    };
  case GET_QUESTION:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
}
export default questions;
