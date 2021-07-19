import {
  ANSWER_BUTTON_CLICKED,
  ANSWER_RESET,
} from '../actions';

const INITIAL_STATE = {
  answerClicked: false,
  timer: 30,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ANSWER_BUTTON_CLICKED:
    return { ...state, answerClicked: true };
  case ANSWER_RESET:
    return { ...state, answerClicked: action.payload };
  default:
    return state;
  }
}

export default gameReducer;
