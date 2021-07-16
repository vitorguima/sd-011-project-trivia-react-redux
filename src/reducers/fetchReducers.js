import { REQUEST_API, REQUEST_API_SUCESS, REQUEST_API_ERROR } from '../actions';

const INITIAL_STATE = {
  questions: [],
  error: '',
};

function fetchReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return { ...state };
  case REQUEST_API_SUCESS:
    return { ...state, questions: action.questions };
  case REQUEST_API_ERROR:
    return { ...state, error: 'Impossível fazer requisição' };
  default:
    return state;
  }
}

export default fetchReducers;
