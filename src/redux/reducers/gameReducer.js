import { REQUEST_API, GET_DATA } from '../actions';

const INITIAL_STATE = {
  questionsData: [],
  isLoading: false,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case GET_DATA:
    return {
      ...state,
      questionsData: action.payload.data,
      isLoading: false,
    };
  default:
    return state;
  }
}
