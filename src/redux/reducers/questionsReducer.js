const INITIAL_STATE = {
  questions: [],
};

const questionsReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case 'CHANGE_QUESTIONS':
    return {
      ...state,
      questions: payload,
    };

  default:
    return state;
  }
};

export default questionsReducer;
