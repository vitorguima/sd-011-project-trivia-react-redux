import { GET_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default loginReducer;
