import {
  ACTION_EMAIL_NOME,
  FETCH_TOKEN_SUCCESS,
} from '../actions';

function GetPlayer(name, email) {
  const player = {
    player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
  };
  localStorage.setItem('state', JSON.stringify(player));
}

function sendToken(token) {
  const tokenToStorage = {
    token,
  };
  localStorage.setItem('token', JSON.stringify(tokenToStorage));
}

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

function homeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTION_EMAIL_NOME:
    GetPlayer(action.name, action.email);
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  case FETCH_TOKEN_SUCCESS:
    sendToken(action.payload.token);
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
}

export default homeReducer;
