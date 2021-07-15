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
    localStorage.setItem('state', JSON.stringify({
      player: {
        name: action.payload.name,
        gravatarEmail: action.payload.email,
        score: 0,
        assertions: 0,
      },
    }));
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
