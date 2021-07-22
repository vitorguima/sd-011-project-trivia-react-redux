import { GRAVATAR, LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  picture: '',
  assertions: 0,
  score: 0,
};

export default function login(state = INITIAL_STATE, action) {
  const storageState = JSON.parse(localStorage.getItem('state'));
  const player = {
    player: {
      name: action.name,
      assertions: 0,
      score: 0,
      gravatarEmail: action.email,
    },
  };

  switch (action.type) {
  case LOGIN:
    localStorage.setItem('state', JSON.stringify(player));
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  case GRAVATAR:
    return {
      ...state,
      picture: action.gravatar,
    };
  case UPDATE_SCORE:
    storageState.player.score += action.points;
    localStorage.setItem('state', JSON.stringify(storageState));
    return {
      ...state,
      score: state.score + action.points,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}
