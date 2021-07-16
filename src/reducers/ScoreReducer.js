import { SUBMIT_SCORE } from '../actions';

const INITIAL_STATE = {
  totalScore: 0,
};

function ScoreReducer(state = INITIAL_STATE, action) {
  const { type, totalScore } = action;
  switch (type) {
  case SUBMIT_SCORE:
    return { ...state, totalScore };
  default:
    return state;
  }
}

export default ScoreReducer;
