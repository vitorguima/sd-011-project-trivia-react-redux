import { combineReducers } from 'redux';
import email from './inputEmail';
import fetchReducers from './fetchReducers';
import timeOver from './timeOver';
import gameScore from './gameScore';

const rootReducer = combineReducers({
  fetchReducers,
  email,
  timeOver,
  gameScore,
});

export default rootReducer;
