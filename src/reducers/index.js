import { combineReducers } from 'redux';
import token from './token';
import user from './user';
import questions from './questions';

const rootReducer = combineReducers({
  token,
  user,
  questions,
});

export default rootReducer;
