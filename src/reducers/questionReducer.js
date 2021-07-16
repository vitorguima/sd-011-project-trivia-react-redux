import {
  REQUEST_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS_FAILED,
} from '../actions/index';

const INITIAL_STATE = {
  questions: [],
};

function questionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload,
    };
  case REQUEST_QUESTIONS_FAILED:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
}

export default questionReducer;
