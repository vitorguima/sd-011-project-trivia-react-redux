import {
  ANSWER_BUTTON_CLICKED,
  ANSWER_RESET,
  START_TIMER,
  UPDATE_TIMER,
  TIMER_RUNOUT,
  RESET_TIMER,
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
  case START_TIMER:
    return { ...state, timer: action.payload };
  case UPDATE_TIMER:
    return { ...state, timer: action.value };
  case TIMER_RUNOUT:
    return { ...state, answerClicked: true };
  case RESET_TIMER:
    return { ...state, answerClicked: false, timer: 30 };
  default:
    return state;
  }
}

export default gameReducer;
