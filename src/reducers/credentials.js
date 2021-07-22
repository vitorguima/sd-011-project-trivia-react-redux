// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_EMAIL, SET_NAME } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function credentials(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EMAIL:
    return { ...state, email: action.email };
  case SET_NAME:
    return { ...state, name: action.name };
  default:
    return state;
  }
}

export default credentials;
