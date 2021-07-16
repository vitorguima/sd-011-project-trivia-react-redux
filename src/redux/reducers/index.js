import { combineReducers } from 'redux';
import questions from './questions';
import player from './player';

const rootReducers = combineReducers({
  questions,
  player,
});

export default rootReducers;
