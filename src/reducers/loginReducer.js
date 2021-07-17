import { LOGIN_INPUT } from '../actions';

const INITIAL_STATE = {
  login: {
    nome: '',
    email: '',
  },
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_INPUT:
    return {
      ...state,
      login: { ...state.login, [action.name]: action.value },
    };

  default:
    return state;
  }
}
