import { GET_QUESTIONS, GET_QUESTIONS_FAILED, GET_QUESTIONS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      loading: true,
    };
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload.results,
      loading: false,
    };
  case GET_QUESTIONS_FAILED:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
}

export default questionsReducer;
