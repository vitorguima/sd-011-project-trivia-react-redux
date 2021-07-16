import {
  START_COUNTER,
  STOP_COUNTER,
  SAVE_COUNTER } from '../actions/counter';

const INITIAL_STATE = {
  counterPoints: null,
  counterStatus: true,
};

const counter = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case START_COUNTER:
    return {
      ...state,
      counterStatus: true,
    };
  case STOP_COUNTER:
    return {
      ...state,
      counterStatus: false,
    };
  case SAVE_COUNTER:
    return {
      ...state,
      counterPoints: action.payload,
    };
  default:
    return state;
  }
};

export default counter;
