import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  token: {},
  isLoading: false,
};

const loginReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_TOKEN_SUCCESS:
    return {
      ...state,
      isLoading: false,
      token: payload.token,
    };
  default:
    return {
      ...state,
    };
  }
};

export default loginReducer;
