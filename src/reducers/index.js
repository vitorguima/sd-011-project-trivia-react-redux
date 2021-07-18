import { combineReducers } from 'redux';
import email from './inputEmail';
import fetchReducers from './fetchReducers';
import getSeconds from './getSeconds';
import gameScore from './gameScore';

const rootReducer = combineReducers({
  fetchReducers,
  email,
  getSeconds,
  gameScore,
});

export default rootReducer;
