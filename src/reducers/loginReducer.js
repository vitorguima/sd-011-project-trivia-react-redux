import { USER_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  gravatarImage: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_DATA:
    return {
      ...state,
      name: action.name,
      email: action.email,
      token: action.token,
      gravatarImage: action.gravatarImage,
    };
  default:
    return state;
  }
};

export default loginReducer;
