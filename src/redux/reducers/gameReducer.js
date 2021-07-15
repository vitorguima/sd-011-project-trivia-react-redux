const INITIAL_STATE = {
  questions: {},
  score: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_QUESTIONS_SUCCESS':
    return {
      ...state,
      questions: action.payload,
      score: action.score,
    };
  default:
    return state;
  }
};

export default gameReducer;
