import { REQUEST_TOKEN, SUBMIT_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
  loading: false,
};

function myReducer(state = INITIAL_STATE, action) {
  const { type, loading, token } = action;
  switch (type) {
  case REQUEST_TOKEN:
    return { ...state, loading };
  case SUBMIT_TOKEN:
    return { ...state, loading, token };
  default:
    return state;
  }
}

export default myReducer;
