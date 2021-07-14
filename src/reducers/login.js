import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  default:
    return state;
  }
}
