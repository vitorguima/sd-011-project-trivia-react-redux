import { USER_INFO } from '../actions';
import { SET_TOKEN } from '../actions/tokenAction';

const initialState = { email: '', name: '', token: '' };

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case USER_INFO: {
    return { ...state, email: payload.email, name: payload.name };
  }
  case SET_TOKEN: {
    return { ...state, token: payload };
  }
  default:
    return { ...state };
  }
};

export default userReducer;
