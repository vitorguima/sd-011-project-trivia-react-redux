import { GET_USER_NAME_AND_EMAIL, SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export default function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER_NAME_AND_EMAIL:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case SCORE:
    return {
      ...state,
      score: (state.score + action.payload),
    };
  default:
    return state;
  }
}
