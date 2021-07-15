import {
  REQUEST_TOKEN_SUCCESS,
} from '../actions';

const INITITAL_STATE = {
  name: '',
  email: '',
  token: '',
};

function login(state = INITITAL_STATE, action) {
  switch (action.type) {
  case 'PLAYER_INFO':
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case REQUEST_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
}

export default login;
