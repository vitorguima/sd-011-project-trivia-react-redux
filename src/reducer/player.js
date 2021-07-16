import { INPUT_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case INPUT_NAME:
    return ({ ...state, name: action.name });
  default:
    return state;
  }
}

export default playerReducer;
