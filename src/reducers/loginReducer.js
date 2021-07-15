import { GET_LOGIN, REQUEST_TOKEN, REQUEST_SUCCESS_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  loading: false,
  apiToken: {},
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case REQUEST_TOKEN:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_SUCCESS_TOKEN:
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      loading: false,
      apiToken: action.payload,
    };
  default:
    return state;
  }
}

export default loginReducer;
