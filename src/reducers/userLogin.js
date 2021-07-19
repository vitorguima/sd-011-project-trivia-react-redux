import { USER_LOGIN, SET_SCORE_POINTS, SEND_ASSERTION } from '../actions';

const USER_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    token: '',
  },
};

function userLogin(state = USER_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  case SET_SCORE_POINTS:
    return {
      player: {
        ...state.player,
        score: action.payload,
      },
    };
  case SEND_ASSERTION:
    return {
      player: {
        ...state.player,
        assertions: action.payload,
      },
    };
  default:
    return state;
  }
}

export default userLogin;
