import { SUBMIT_FORM, FETCH_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  userToken: '',
};

const login = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SUBMIT_FORM:
    return {
      ...state,
      name: payload.nome,
      email: payload.email,
    };
  case FETCH_TOKEN:
    return {
      ...state,
      userToken: payload,
    };
  default:
    return state;
  }
};

export default login;
