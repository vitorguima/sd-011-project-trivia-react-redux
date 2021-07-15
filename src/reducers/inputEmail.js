// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_EMAIL, GET_NAME } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function email(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_EMAIL:
    return { ...state, email: action.email };
  case GET_NAME:
    return { ...state, name: action.name };
  default:
    return state;
  }
}

export default email;
