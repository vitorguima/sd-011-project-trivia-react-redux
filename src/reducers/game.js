import { SET_BTN_HIDDEN, SET_CLICKED, SET_TIMER, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  hidden: true,
  clicked: false,
  score: 0,
  timer: 31,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_BTN_HIDDEN:
    return { ...state, hidden: action.payload };
  case SET_CLICKED:
    return { ...state, clicked: action.payload };
  case SET_TIMER:
    return { ...state, timer: action.payload };
  case SET_SCORE:
    return { ...state, score: action.payload };
  default:
    return state;
  }
};

export default game;
