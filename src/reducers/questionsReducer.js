import {
  SAVE_QUESTIONS,
  SAVE_QUESTIONS_ERROR,
  SAVE_QUESTIONS_SUCCESS,
  ROLE_QUESTION,
  ANSWERED_QUESTION,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  position: 0,
  loading: true,
  answered: false,
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
      position: 0,
      answered: false,
      questions: [...action.payload],
      loading: false,
    };

  case SAVE_QUESTIONS_ERROR:
    return {
      ...state,
      loading: false,
    };

  case ROLE_QUESTION:
    return {
      ...state,
      position: state.position + action.payload,
    };
  case ANSWERED_QUESTION:
    return {
      ...state,
      answered: action.payload,
    };
  default:
    return state;
  }
}
