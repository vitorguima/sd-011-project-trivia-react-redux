import { SET_BTN_HIDDEN } from '../actions';

const INITIAL_STATE = {
  hidden: true,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_BTN_HIDDEN:
    return { ...state, hidden: action.payload };
  default:
    return state;
  }
};

export default game;
