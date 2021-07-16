import {
  SEND_GRAVATAR_SRC_IMG,
} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  srcGravatarImg: '',
  token: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_GRAVATAR_SRC_IMG:
    return {
      ...state,
      srcGravatarImg: action.src,
      name: action.name,
      gravatarEmail: action.email,
      token: action.token,
    };

  default:
    return state;
  }
}

export default player;
