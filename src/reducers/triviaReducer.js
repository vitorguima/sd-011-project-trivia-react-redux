import {
  REQUEST_TRIVIA,
  REQUEST_TRIVIA_SUCCESS,
  REQUEST_TRIVIA_ERROR,
  TIMER_BUTTON,
  REQUEST_CLICK_BUTTON,
} from '../actions';

const INITIAL_STATE = {
  error: '',
  questions: [],
  isLoading: true,
  buttonDisable: false,
  buttonClick: false,
  rightBtnClicked: false,
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TRIVIA:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_TRIVIA_SUCCESS:
    return {
      ...state,
      questions: action.state,
      isLoading: false,
    };
  case REQUEST_TRIVIA_ERROR:
    return {
      ...state,
      isLoading: true,
      error: action.state,
    };
  case TIMER_BUTTON:
    return {
      ...state,
      buttonDisable: true,
    };
  case REQUEST_CLICK_BUTTON:
    return {
      ...state,
      buttonClick: action.state.buttonClick,
      rightBtnClicked: action.state.rightBtnClicked,
    };
  default:
    return state;
  }
}

export default triviaReducer;
