import { LOGIN, GET_SCORE, RESET_STATE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, name: action.name, email: action.email };
  case GET_SCORE:
    return { ...state, score: state.score + action.score };
  case RESET_STATE:
    return INITIAL_STATE;
  default:
    return state;
  }
}
