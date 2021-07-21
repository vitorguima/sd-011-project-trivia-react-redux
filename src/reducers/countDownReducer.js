import { TICK_COUNTDOWN, CHANGE_TO_NEXT_QUESTION, RESET_COUNTDOWN } from '../actions';

const INITIAL_STATE = {
  timer: 30,
};

const countDownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TICK_COUNTDOWN:
    return { ...state, timer: state.timer - 1 };
  case RESET_COUNTDOWN:
  case CHANGE_TO_NEXT_QUESTION:
    return { ...state, timer: 30 };
  default:
    return state;
  }
};

export default countDownReducer;
