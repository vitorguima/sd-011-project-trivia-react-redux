import { GRAVATAR, QUESTIONS, UPDATE_SCORE } from '../actions';

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
  loading: true,
  error: false,
};

export default function playerReducer(state = INITIAL_STATE, action) {
  const ERROR_CODE = 3;
  const storageState = JSON.parse(localStorage.getItem('state'));
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
      loading: false,
      error: action.questions.response_code === ERROR_CODE,
    };
  case UPDATE_SCORE:
    storageState.player.score += action.points;
    localStorage.setItem('state', JSON.stringify(storageState));
    return {
      ...state,
      score: state.score + action.points,
    };
  default:
    return state;
  }
}
