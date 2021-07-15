import { FETCH_QUESTION_SUCCESS } from '../actions';

const INITIAL_STATE = {
  Questions: [],
};

function gameReduce(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_QUESTION_SUCCESS:
    return {
      ...state,
      Questions: [...action.payload.results],
    };

  default:
    return state;
  }
}

export default gameReduce;
