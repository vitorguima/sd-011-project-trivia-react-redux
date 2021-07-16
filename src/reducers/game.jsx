import { GET_ALL_QUESTIONS,
  CURRENT_QUESTION,
  NEXT_INDEX, SET_TIMER, SELECTED_CHOICE, randomArray } from '../actions/gameActions';

const initialState = {
  allQuestions: {},
  index: 0,
  currentQuestion: {},
  timer: 30,
  selectedChoice: '' };

const gameReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case GET_ALL_QUESTIONS: {
    return { ...state, allQuestions: payload };
  }
  case CURRENT_QUESTION: {
    const { allQuestions, index } = state;
    const curr = randomArray(allQuestions[index]);
    return { ...state, currentQuestion: { ...curr } };
  }

  case NEXT_INDEX: {
    const { index } = state;
    return { ...state, index: index + 1 };
  }
  case SET_TIMER: {
    return { ...state, timer: payload };
  }
  case SELECTED_CHOICE: {
    return { ...state, selectedChoice: payload };
  }
  default:
    return { ...state };
  }
};

export default gameReducer;
