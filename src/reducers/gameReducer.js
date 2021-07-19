import {
  ANSWER_BUTTON_CLICKED,
  ANSWER_RESET,
} from '../actions/index';

const INITIAL_STATE = {
  answerClicked: false,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ANSWER_BUTTON_CLICKED:
    return { ...state, answerClicked: action.payload };
  case ANSWER_RESET:
    return { ...state, answerClicked: action.payload };
  default:
    return state;
  }
}

export default gameReducer;
