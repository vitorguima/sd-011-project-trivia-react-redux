import { combineReducers } from 'redux';
import token from './token';
import user from './user';
import questions from './questions';
import timer from './timer';

const rootReducer = combineReducers({
  token,
  user,
  questions,
  timer,
});

export default rootReducer;
