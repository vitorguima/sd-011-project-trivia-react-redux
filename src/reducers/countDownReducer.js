import { START_COUNTDOWN, CHANGE_TO_NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  timer: 30,
};

const countDownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case START_COUNTDOWN:
    return {
      ...state,
      timer: state.timer - 1,
    };
  case CHANGE_TO_NEXT_QUESTION:
    return {
      ...state,
      timer: 30,
    };
  default:
    return state;
  }
};

export default countDownReducer;
