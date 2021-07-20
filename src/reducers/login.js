import {
  LOGIN,
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_ERROR,
  GRAVATAR_IMAGE,
} from '../actions/login';

const INITIAL_STATE = {
  user: '',
  email: '',
  gravatarImage: '',
  token: '',
  error: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      user: action.infos.user,
      email: action.infos.email,
    };
  case REQUEST_TOKEN:
    return {
      ...state,
    };
  case REQUEST_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
    };
  case REQUEST_TOKEN_ERROR:
    return {
      ...state,
      error: action.payload.error,
    };
  case GRAVATAR_IMAGE:
    return {
      ...state,
      gravatarImage: action.payload,
    };
  default:
    return state;
  }
};

export default login;
