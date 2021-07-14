import { VALIDATE_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  playerName: '',
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case VALIDATE_LOGIN:
    return {
      ...state,
      email: action.email,
      playerName: action.playerName,
    };
  default:
    return state;
  }
}

export default tokenReducer;
