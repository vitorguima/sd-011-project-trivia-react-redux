import {
  GRAVATAR_IMAGE,
} from '../actions/game';

const INITIAL_STATE = {
  gravatarImage: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GRAVATAR_IMAGE:
    return {
      ...state,
      gravatarImage: action.payload,
    };
  default:
    return state;
  }
};

export default game;
