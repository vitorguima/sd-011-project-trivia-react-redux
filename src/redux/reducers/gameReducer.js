import { GET_DATA_QUESTIONS,
  REQUEST_API_QUESTIONS, HANDLE_CLICKED_BUTTON } from '../actions';

const INITIAL_STATE = {
  questionsData: {},
  isReady: false,
  clicked: false,
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
  case HANDLE_CLICKED_BUTTON:
    return {
      ...state,
      clicked: true,
    };
  default:
    return state;
  }
}
