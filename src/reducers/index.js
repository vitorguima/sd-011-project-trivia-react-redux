import { combineReducers } from 'redux';
import email from './inputEmail';
import fetchReducers from './fetchReducers';
import getSeconds from './getSeconds';
import question from './question';

const rootReducer = combineReducers({
  fetchReducers,
  email,
  getSeconds,
  question,
});

export default rootReducer;
