import * as actions from '../actions';

const INITIAL_STATE = {
  category: '',
  question: '',
  correct_answer: '',
  incorrect_answers: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.QUESTION_REQUEST:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
