import {
  SUBMIT_FORM, FETCH_TOKEN,
  FETCH_QUESTIONS,
  HIDE_LOADING,
  SHOW_LOADING } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  userToken: '',
  score: 0,
  questions: [],
  loading: true,
};

const login = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SUBMIT_FORM:
    return {
      ...state,
      name: payload.name,
      email: payload.email,
    };
  case FETCH_TOKEN:
    return {
      ...state,
      userToken: payload,
    };
  case FETCH_QUESTIONS:
    return {
      ...state,
      questions: payload,
    };
  case HIDE_LOADING:
    return {
      ...state,
      loading: false,
    };
  case SHOW_LOADING:
    return {
      ...state,
      loading: true,
    };
  default:
    return state;
  }
};

export default login;
