import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_FAIL,
  REQUEST_QUESTIONS_SUCCESS,
} from '../actions';

// informações mockadas
const INNITIAL_STATE = {
  questionsArr: [],
  currentQuestion: 0,
  loading: true,
};

function questions(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, loading: true };
  case REQUEST_QUESTIONS_SUCCESS:
    return {
      ...state,
      questionsArr: [...action.payload.results],
      loading: false,
    };
  case REQUEST_QUESTIONS_FAIL:
    return { ...state, error: action.payload, loading: false };
  default:
    return state;
  }
}

export default questions;
