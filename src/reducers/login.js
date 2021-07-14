import { SUBMIT_FORM } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_FORM:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default login;
