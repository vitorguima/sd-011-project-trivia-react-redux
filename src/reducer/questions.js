import { FETCH_STARTED, FETCH_SUCCESS, FETCH_ERROR } from '../actions';

const initialState = {
  token: '',
  isLoading: false,
  error: null,
};

function questions(state = initialState, action) {
  switch (action.type) {
  case FETCH_STARTED:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_SUCCESS:
    return {
      ...state,
      token: action.payload,
      isLoading: false,
      error: null,
    };
  case FETCH_ERROR:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
      token: null,
    };
  default:
    return state;
  }
}
export default questions;
