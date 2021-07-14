import { USER_LOGIN } from '../actions';

const USER_STATE = {
  email: '',
};

function userLogin(state = USER_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {

    };
  default:
    return state;
  }
}

export default userLogin;
