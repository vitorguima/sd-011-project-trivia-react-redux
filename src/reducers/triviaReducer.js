import { ENABLE_BTNS, SUB_TIMER, SCORE_UPDATE, RESET_TIMER } from '../actions';

const INITIAL_STATE = {
  token: '',
  error: '',
  questions: {},
  gravatarAvatar: '',
  timer: 30,
  isDisable: false,
  score: 0,
  assertions: 0,
};

export default function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_SUCESS':
    return {
      ...state,
      token: action.payload,
    };
  case 'REQUEST_ERROR':
    return {
      ...state,
      error: action.payload,
    };
  case 'REQUEST_QUESTIONS':
    return {
      ...state,
      questions: { ...action.payload },
    };
  case SUB_TIMER:
    return {
      ...state,
      timer: state.timer - 1,
      isDisable: (state.timer <= 1),
    };
  case ENABLE_BTNS:
    return {
      ...state,
      isDisable: false,
    };
  case SCORE_UPDATE:
    return {
      ...state,
      score: (state.score + action.payload),
      assertions: state.assertions + 1,
    };
  case RESET_TIMER:
    return {
      ...state,
      timer: 30,
    };
  default:
    return state;
  }
}
