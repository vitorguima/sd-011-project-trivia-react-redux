import { GET_NEXT_QUESTION, WAS_ANSWERED } from '../actions';

const initialState = {
  questionIndex: 0,
  wasAnswered: false,
};

const questionHandlers = (state = initialState, { type }) => {
  switch (type) {
  case GET_NEXT_QUESTION:
    return {
      wasAnswered: false,
      questionIndex: state.questionIndex + 1,
    };
  case WAS_ANSWERED:
    return { ...state, wasAnswered: true };
  default:
    return state;
  }
};

export default questionHandlers;
