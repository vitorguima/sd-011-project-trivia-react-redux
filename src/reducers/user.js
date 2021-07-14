import { NEW_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
};

const newUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_USER:
    return {
      ...state,
      email: action.email,
      user: action.user,
    };
  default:
    return state;
  }
};

export default newUser;
