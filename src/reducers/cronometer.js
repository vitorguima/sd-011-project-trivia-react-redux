import { COUNTDOWN, STOP_COUNTDOWN } from '../actions';

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
  default:
    return state;
  }
}
