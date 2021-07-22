import { QUESTIONS, TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [{
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  }],
  loading: true,
  error: false,
};

export default function game(state = INITIAL_STATE, action) {
  const ERROR_CODE = 3;
  switch (action.type) {
  case TOKEN:
    localStorage.setItem('token', action.token.token);
    return {
      ...state,
      token: action.token,
    };
  case QUESTIONS:
    return {
      ...state,
      questions: action.questions.results,
      loading: false,
      error: action.questions.response_code === ERROR_CODE,
    };
  default:
    return state;
  }
}
