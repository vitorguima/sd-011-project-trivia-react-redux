import { LOGIN, TOKEN } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

export default function login(state = INITIAL_STATE, action) {
  const player = {
    player: {
      name: action.name,
      assertions: 0,
      score: 0,
      gravatarEmail: action.email,
    },
  };

  switch (action.type) {
  case LOGIN:
    localStorage.setItem('state', JSON.stringify(player));
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
