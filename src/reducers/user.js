import { GET_USER_INFO } from '../actions';

const INITIAL_STATE = {
  user: {
    name: '',
    email: '',
    urlAvatar: '',
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER_INFO:
    return {
      ...state,
      user: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
