import { USER_INFO } from '../actions';
import { GET_ALL_QUESTIONS } from '../actions/gameActions';

const initialState = {
  name: '',
  gravatarEmail: 'GET',
  assertions: 0,
  score: 0,
};

const gameReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case USER_INFO: {
    return { ...state, email: payload.email, name: payload.name };
  }
  case GET_ALL_QUESTIONS: {
    return { ...state, allQuestions: payload };
  }
  default:
    return { ...state };
  }
};

export default gameReducer;
