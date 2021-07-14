import { GET_TOKEN } from '../action';

const INITIAL_STATE = {};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default tokenReducer;
