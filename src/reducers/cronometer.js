import { COUNTDOWN, RESET_COUNTDOWN, STOP_COUNTDOWN } from '../actions';

const INITIAL_STATE = {
  timer: 30,
  stopTimer: false,
};

export default function timerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case COUNTDOWN:
    return {
      ...state,
      timer: state.timer - 1,
    };
  case STOP_COUNTDOWN:
    return {
      ...state,
      stopTimer: true,
    };
  case RESET_COUNTDOWN:
    return {
      ...state,
      timer: 30,
      stopTimer: false,
    };
  default:
    return state;
  }
}
