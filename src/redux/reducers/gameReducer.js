import { GET_DATA_QUESTIONS, REQUEST_API_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questionsData: {},
  isReady: false,
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API_QUESTIONS:
    return {
      ...state,
      isReady: true,
    };
  case GET_DATA_QUESTIONS:
    return {
      ...state,
      questionsData: action.payload.data,
      isReady: false,
    };
  default:
    return state;
  }
}
