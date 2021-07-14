import { REQUEST_TOKEN, RECEIVE_TOKEN } from '../actions/index';

const INITIAL_STATE = {
  results: [],
};

export default function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return ({
      ...state,
      isFetching: true,
    });
  case RECEIVE_TOKEN:
    return ({
      ...state,
      isFetching: false,
      results: action.token,
    });
  default:
    return state;
  }
}
