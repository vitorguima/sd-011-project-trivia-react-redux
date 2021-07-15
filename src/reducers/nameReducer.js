import { CREATE_USER_NAME } from '../action';

const INITIAL_STATE = {};

function nameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CREATE_USER_NAME:
    return {
      ...state,
      nome: action.payload,
    };
  default:
    return state;
  }
}

export default nameReducer;
