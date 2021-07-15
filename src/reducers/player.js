import { GRAVATAR } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  picture: '',
};

export default function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GRAVATAR:
    return {
      ...state,
      picture: action.gravatar,
    };
  default:
    return state;
  }
}
