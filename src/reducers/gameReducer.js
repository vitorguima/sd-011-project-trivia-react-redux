import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  isLoading: false,
};

const gameReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_QUESTIONS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      questions: [...payload.results],
    };
  default:
    return {
      ...state,
    };
  }
};

export default gameReducer;
