import { GET_NEXT_QUESTION, SET_SCORE, WAS_ANSWERED } from '../actions';

const initialState = {
  question: {
    questionIndex: 0,
    score: 0,
    timeScore: 0,
    difficultyScore: 0,
  },
  wasAnswered: false,
};

const gameScore = (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_NEXT_QUESTION:
    return { wasAnswered: false,
      ...state.question,
      question: {
        questionIndex: state.question.questionIndex + 1,
        score: 0,
        timeScore: 0,
        difficultyScore: 0,
      },
    };
  case WAS_ANSWERED:
    return { ...state, wasAnswered: true };
  case SET_SCORE:
    return { ...state,
      question: {
        ...state.question,
        score: state.question.score + payload,
      } };
  default:
    return state;
  }
};

export default gameScore;
