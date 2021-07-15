import { SAVE_LOGIN } from '../actions';

const INNITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

function user(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  default:
    return state;
  }
}

export default user;
