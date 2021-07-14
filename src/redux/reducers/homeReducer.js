import {
  ACTION_EMAIL_NOME,
  FETCH_TOKEN_SUCCESS,
} from '../actions';

function sendToken(name, email, token) {
  const player = {
    name,
    assertion: '',
    score: 0,
    gravatarMail: email,
  };
  const tokenToStorage = {
    token,
  };
  localStorage.setItem('player', JSON.stringify(player));
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
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  case FETCH_TOKEN_SUCCESS:
    sendToken(state.name, state.email, action.payload.token);
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
}

export default homeReducer;
