import { USER_EMAIL } from '../actions';

const INITIAL_STATE = {
  user: '',
  email: '',
};

export default function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      user: action.payload.user,
      email: action.payload.email,
    };
  default:
    return state;
  }
}
