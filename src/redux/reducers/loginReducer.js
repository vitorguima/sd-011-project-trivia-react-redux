import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {

};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
    };
  default:
    return state;
  }
}
