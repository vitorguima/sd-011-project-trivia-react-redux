import { ENABLE_BTNS, SUB_TIMER } from '../actions';

const INITIAL_STATE = {
  login: {
    nome: '',
    email: '',
  },
  token: '',
  error: '',
  questions: {},
  gravatarAvatar: '',
  timer: 30,
  isDisable: false,
};

export default function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_INPUT':
    return {
      ...state,
      login: { ...state.login, [action.name]: action.value },
    };
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
  default:
    return state;
  }
}
