import {
  ADD_PLAYER,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      name: action.payload,
      gravatarEmail: action.payload2,
    };
  default:
    return {
      ...state,
    };
  }
};

export default playerReducer;
