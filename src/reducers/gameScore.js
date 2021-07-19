import { SET_SCORE } from '../actions';

const initialState = {
  userResults: {
    questionNumber: 0,
    score: 0,
    timeScore: 0,
    difficulty: 0,
  },
};

const gameScore = (state = initialState, { type, payload }) => {
  switch (type) {
  case SET_SCORE:
    return {
      ...state.userResults,
      userResults: {
        questionNumber: payload.questionNumber,
        score: payload.score,
        timeScore: payload.time,
        difficultyScore: payload.difficulty,
      } };
  default:
    return state;
  }
};

export default gameScore;
