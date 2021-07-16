import { SUCESS } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const reducerToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCESS:
    return { ...state, token: action.payload };
  default:
    return state;
  }
};

export default reducerToken;

