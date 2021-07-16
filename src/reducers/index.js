import { combineReducers } from 'redux';
import email from './inputEmail';
import fetchReducers from './fetchReducers';
import getSeconds from './getSeconds';

const rootReducer = combineReducers({
  fetchReducers,
  email,
  getSeconds,
});

export default rootReducer;
