import {
  REQUEST_TRIVIA,
  REQUEST_TRIVIA_SUCCESS,
  REQUEST_TRIVIA_ERROR,
  TIMER_BUTTON,
  REQUEST_CLICK_BUTTON,
  TIME,
  SEND_SCORE,
} from '../actions';

const INITIAL_STATE = {
  error: '',
  questions: [],
  isLoading: true,
  buttonDisable: false,
  buttonClick: false,
  rightAnswerClicked: false,
  index: 0,
  seconds: 30,
  assertions: 0,
};

function trivia(state = INITIAL_STATE, action) {
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
  case TIME:
    return {
      ...state,
      seconds: action.state,
    };
  case REQUEST_CLICK_BUTTON:
    return {
      ...state,
      buttonClick: action.state.buttonClick,
      rightAnswerClicked: action.state.rightAnswerClicked,
      buttonDisable: false,
    };
  case SEND_SCORE:
    return {
      ...state,
      assertions: action.state,
    };
  default:
    return state;
  }
}

export default trivia;
