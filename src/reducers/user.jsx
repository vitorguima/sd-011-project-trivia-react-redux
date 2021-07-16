import {
  REQUEST_API,
  REQUEST_API_SUCESS,
  REQUEST_API_ERROR,
} from '../actions/index';

const INITIAL_STATE = {
  questions: {},
  isFetching: false,
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
      questions: action.payload,
    };
  case REQUEST_API_ERROR:
    return {
      ...state,
      questions: Error,
    };
  default:
    return state;
  }
}

export default user;
