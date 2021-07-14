import { LOGIN } from '../actions';

const INNITIAL_STATE = {
  name: 'anon',
  email: '',
  score: 0,
};

function user(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, avatarURL: action.payload };
  default:
    return state;
  }
}

export default user;
