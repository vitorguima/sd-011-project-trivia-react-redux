import { SUBMIT_FORM, FETCH_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  userToken: '',
  score: 0,
  loading: false,
};

const login = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SUBMIT_FORM:
    return {
      ...state,
      name: payload.name,
      email: payload.email,
      loading: true,
    };
  case FETCH_TOKEN:
    return {
      ...state,
      userToken: payload,
      loading: false,
    };
  default:
    return state;
  }
};

export default login;
