import { SET_SCORE } from '../actions';

const initialState = {
  userResults: {
    questionNumber: 0,
    score: 0,
    timeScore: 0,
    difficulty: '',
  },
};

const gameScore = (state = initialState, { type, payload }) => {
  switch (type) {
  case SET_SCORE:
    return {
      ...state,
      [payload.questionNumber]: {
        score: payload.score,
        timeScore: payload.time,
        difficulty: payload.difficulty,
      },
    };
  default:
    return state;
  }
};

export default gameScore;
