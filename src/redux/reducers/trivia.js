import { SEND_QUESTIONS } from '../actions';

const INITIAL_STATE = { idTrivia: 0, questions: [] };

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_QUESTIONS:
    return ({
      ...state,
      questions: [...action.questions],
    });
  default:
    return state;
  }
}

export default trivia;
