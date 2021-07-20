import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  NEXT_QUESTION,
  UPDATE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  question: {},
  isLoading: true,
  error: null,
  score: 0,
  assertions: 0,
};

const getNextQuestion = (
  { questions, question },
) => questions[questions.indexOf(question) + 1];

const gameReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_QUESTIONS:
    return {
      ...INITIAL_STATE,
    };
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: payload,
      question: payload[0],
      isLoading: false,
    };
  case GET_QUESTIONS_ERROR:
    return {
      ...state,
      error: payload,
      isLoading: false,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      question: getNextQuestion(state),
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default gameReducer;
