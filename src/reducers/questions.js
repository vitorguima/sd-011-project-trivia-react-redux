import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_FAIL,
  REQUEST_QUESTIONS_SUCCESS,
  START_COUNTDOWN,
  UPDATE_CLOCK,
} from '../actions';

// informações mockadas
const INNITIAL_STATE = {
  questionsArr: [],
  currentQuestion: 0,
  loading: true,
  timer: 30,
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
  case START_COUNTDOWN:
    return { ...state, timer: 30 };
  case UPDATE_CLOCK:
    return { ...state, timer: state.timer - 1 };
  default:
    return state;
  }
}

export default questions;
