import { TIMEOVER } from '../actions';

const INITIAL_STATE = {
  seconds: '',
};

const timeOver = (state = INITIAL_STATE, { type, seconds }) => {
  switch (type) {
  case TIMEOVER:
    return { ...state, seconds };

  default:
    return state;
  }
};

export default timeOver;
