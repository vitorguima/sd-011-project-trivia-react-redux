import { LOGIN } from '../actions';

const INITIAL_STATE = {
  username: '',
  avatar: '',
  score: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      username: action.username,
      avatar: action.avatar,
      score: action.score,
    };
  default:
    return state;
  }
};

export default userReducer;
