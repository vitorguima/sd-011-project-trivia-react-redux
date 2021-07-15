import { USER_LOGIN } from '../actions';

const USER_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
  ranking: [],
};

function userLogin(state = USER_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default userLogin;
