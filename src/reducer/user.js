import { REQUEST_TOKEN, RECEIVE_TOKEN, INPUT_NAME } from '../actions/index';

const INITIAL_STATE = {
  results: [],
  nome: '',
};

export default function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case INPUT_NAME:
    return ({
      ...state,
      nome: action.name,
    });
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
