// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
};

function name(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_NAME:
    return { ...state, name: action.name };
  default:
    return state;
  }
}

export default name;
