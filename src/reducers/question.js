import { GET_NEXT_QUESTION, WAS_ANSWERED } from '../actions';

const initialState = {
  questionCounter: 1,
  wasAnswered: false,
};

const question = (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_NEXT_QUESTION:
    return { ...state, questionCounter: state.questionCounter + payload };
  case WAS_ANSWERED:
    return { ...state, questionCounter: state.questionCounter, wasAnswered: true };
  default:
    return state;
  }
};

export default question;
