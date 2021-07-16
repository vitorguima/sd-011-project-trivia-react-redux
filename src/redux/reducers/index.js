import { combineReducers } from 'redux';
import questions from './questions';
import player from './player';
import trivia from './trivia';

const rootReducers = combineReducers({
  questions,
  player,
  trivia,
});

export default rootReducers;
