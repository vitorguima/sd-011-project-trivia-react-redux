import { GET_USER_NAME_AND_EMAIL } from '../actions';

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
  default:
    return state;
  }
}
