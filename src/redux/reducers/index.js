import { combineReducers } from 'redux';
import login from './login';
import player from './player';
import trivia from './trivia';

const rootReducers = combineReducers({
  login,
  player,
  trivia,
});

export default rootReducers;
