import { SAVE_QUESTIONS, SAVE_QUESTIONS_ERROR, SAVE_QUESTIONS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  // currentQuestion: 0,
  loading: true,
};

export default function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      loading: true,
    };

  case SAVE_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: [...action.payload],
      loading: false,
    };

  case SAVE_QUESTIONS_ERROR:
    return {
      ...state,
      loading: false,
    };

  default:
    return state;
  }
}
