import { LOGIN } from '../actions/login';

const INITIAL_STATE = {
  user: '',
  email: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      user: action.infos.user,
      email: action.infos.email,
    };
  default:
    return state;
  }
};

export default login;
