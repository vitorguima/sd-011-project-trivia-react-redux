import { USER_INFO } from '../actions';

const initialState = { email: 'vrau' };

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_INFO: {
      return { ...state, email: payload.email };
    }
    default:
      return { ...state };
  }
};

export default userReducer;
