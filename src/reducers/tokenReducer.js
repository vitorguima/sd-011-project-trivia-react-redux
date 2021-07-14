import { REQUEST_API, RECEIVE_API, ERROR_API } from '../actions';

const INITIAL_STATE = {
  token: '',
  error: '',
  loading: true,
};

function tokenReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_API:
    return {
      ...state,
      loading: true,
    };
  case RECEIVE_API:
    return {
      ...state,
      token: payload.token,
      loading: false,
    };
  case ERROR_API:
    return {
      ...state,
      error: payload,
      loading: false,
    };
  default:
    return state;
  }
}

export default tokenReducer;
