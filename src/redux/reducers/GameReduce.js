import { FETCH_QUESTION_SUCCESS } from '../actions';

const INITIAL_STATE = {
  Questions: [],
  results: [],
};

function gameReduce(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_QUESTION_SUCCESS:
    console.log(action.payload.results[0].question);
    return {
      ...state,
      Questions: [...state.Questions, action.payload],
    };

  default:
    return state;
  }
}

export default gameReduce;
