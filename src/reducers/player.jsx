import { USER_INFO } from '../actions';

const initialState = {
  name: '',
  gravatarEmail: 'GET',
  assertions: 0,
  score: 0,
};

const playerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case USER_INFO: {
    return { state: payload };
  }

  default:
    return { ...state };
  }
};

export default playerReducer;
