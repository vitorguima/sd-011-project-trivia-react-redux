import {
  QUESTIONS_REQUEST,
  FAILED_QUESTIONS_REQUEST,
  GET_QUESTIONS,
} from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  questions: '',
};

function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTIONS_REQUEST:
    return { ...state, loading: true };
  case FAILED_QUESTIONS_REQUEST:
    return { ...state, error: action.error, loading: false };
  case GET_QUESTIONS:
    return { ...state, questions: action.json, loading: false };
  default:
    return state;
  }
}

export default questionsReducer;
