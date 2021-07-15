import { LOGIN, TOKEN } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  case TOKEN:
    localStorage.setItem('token', action.token.token);
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}
