import { combineReducers } from 'redux';
import email from './credentials';
import fetchReducers from './fetchReducers';
import timeHandler from './timeHandler';
import gameScore from './gameScore';
import questionHandlers from './questionHandlers';

const rootReducer = combineReducers({
  fetchReducers,
  email,
  timeHandler,
  gameScore,
  questionHandlers,
});

export default rootReducer;
