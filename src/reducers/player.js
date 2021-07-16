import { GRAVATAR, QUESTIONS } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  picture: '',
  questions: [{
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  }],
  error: false,
};

export default function playerReducer(state = INITIAL_STATE, action) {
  const ERROR_CODE = 3;
  switch (action.type) {
  case GRAVATAR:
    return {
      ...state,
      picture: action.gravatar,
    };
  case QUESTIONS:
    return {
      ...state,
      questions: action.questions.results,
      error: action.questions.response_code === ERROR_CODE,
    };
  default:
    return state;
  }
}
