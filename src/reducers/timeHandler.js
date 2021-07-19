import { TIMEOVER, TIME_ANSWERED } from '../actions';

const INITIAL_STATE = {
  secondsToFinish: 30,
  secondsScore: 0,
};

const timeHandler = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case TIMEOVER:
    return { ...state, secondsToFinish: payload };
  case TIME_ANSWERED:
    return { ...state, secondsScore: payload };
  default:
    return state;
  }
};

export default timeHandler;
