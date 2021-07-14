import { REQUEST_VALUES, RECEIVE_VALUES } from '../actions/index';

const INITIAL_STATE = {
  id: 0,
  results: [],
};

export default function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_VALUES:
    return ({
      ...state,
      isFetching: true,
    });
  case RECEIVE_VALUES:
    return ({
      ...state,
      isFetching: false,
      results: action.values,
    });
  default:
    return state;
  }
}
