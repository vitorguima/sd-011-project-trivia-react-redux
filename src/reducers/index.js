import { combineReducers } from 'redux';
import email from './inputEmail';
import fetchReducers from './fetchReducers';
import timeOver from './timeOver';
import gameScore from './gameScore';
import questionHandlers from './questionHandlers';

const rootReducer = combineReducers({
  fetchReducers,
  email,
  timeOver,
  gameScore,
  questionHandlers,
});

export default rootReducer;
