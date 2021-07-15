const INITIAL_STATE = {
  questions: [],
  token: '',
  isFetching: true,
  error: '',
  score: 0,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_QUESTIONS':
    return { ...state, isFetching: true };
  case 'REQUEST_TOKEN':
    return { ...state, isFetching: true };
  case 'GET_QUESTIONS':
    return { ...state, isFetching: false, questions: action.state.results };
  case 'GET_TOKEN':
    return { ...state, isFetching: false, token: action.state.token };
  case 'ADD_POINT':
    return { ...state, score: state.score + 1 };
  default:
    return state;
  }
}

export default questions;
