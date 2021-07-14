import { USER_LOGIN, REQUEST_API, GET_DATA } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  token: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case USER_LOGIN:
    return {
      ...state,
    };
  case GET_DATA:
    return {
      ...state,
      token: action.payload.data.token,
      isLoading: false,
    };
  default:
    return state;
  }
}
