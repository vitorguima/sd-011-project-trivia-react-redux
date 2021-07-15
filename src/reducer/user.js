import { GET_EMAIL, GET_NAME } from '../actions';

const initialState = {};

function user(state = initialState, action) {
  switch (action.type) {
  case GET_NAME:
    return { ...state, name: action.payload };
  case GET_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
