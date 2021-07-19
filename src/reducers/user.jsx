import {
  REQUEST_API,
  REQUEST_API_SUCESS,
  REQUEST_API_ERROR,
  SEND_USER_DATA,
  MOSTRA_BTN,
} from '../actions/user';

const INITIAL_STATE = {
  token: '',
  userData: {},
  isFetching: false,
  hidden: true,
};

function user(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_API_SUCESS:
    return {
      ...state,
      isFetching: false,
      token: action.payload,
    };
  case REQUEST_API_ERROR:
    return {
      ...state,
      token: Error,
    };
  case SEND_USER_DATA:
    return { ...state, userData: { ...action.payload } };

  case MOSTRA_BTN:
    return { ...state, hidden: action.payload };
  default:
    return state;
  }
}

export default user;
