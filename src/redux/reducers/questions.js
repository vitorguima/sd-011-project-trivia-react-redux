import {
  SEND_QUESTIONS,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };

  default:
    return state;
  }
}

export default questions;
