import {
  CREATE_USER_EMAIL,
  CREATE_USER_HASH,
  CREATE_USER_NAME,
  // GET_TOKEN_SUCCESS,
  // GET_TOKEN_ERROR
} from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  hash: '',
  score: 0,
  assertion: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CREATE_USER_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case CREATE_USER_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case CREATE_USER_HASH:
    return {
      ...state,
      hash: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
