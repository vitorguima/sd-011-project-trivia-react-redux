import { NEW_QUESTION_TIME, SET_SECONDS_TO_FINISH } from '../actions';

const INITIAL_STATE = {
  secondsToFinish: 30,
};

const timeHandler = (state = INITIAL_STATE, { type }) => {
  switch (type) {
  case SET_SECONDS_TO_FINISH:
    return { ...state, secondsToFinish: state.secondsToFinish - 1 };
  case NEW_QUESTION_TIME:
    return { ...state, secondsToFinish: 30 };
  default:
    return state;
  }
};

export default timeHandler;
