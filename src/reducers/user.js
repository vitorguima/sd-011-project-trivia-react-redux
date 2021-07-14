import { NEW_USER, NEW_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
};

const newUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_USER:
    return {
      ...state,
      user: action.state,
    };
  case NEW_EMAIL:
    return {
      ...state,
      email: action.state,
    };
  default:
    return state;
  }
};

export default newUser;
