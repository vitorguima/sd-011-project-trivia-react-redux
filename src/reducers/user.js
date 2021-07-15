import {
  USER_EMAIL,
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCESS,
  REQUEST_TOKEN_FAIL,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  loading: false,
};

export default function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case REQUEST_TOKEN:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_TOKEN_SUCESS:
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      token: action.state.token,
      loading: false,
    };
  case REQUEST_TOKEN_FAIL:
    return {
      ...state,
      loading: false,
    };
  default:
    return state;
  }
}
