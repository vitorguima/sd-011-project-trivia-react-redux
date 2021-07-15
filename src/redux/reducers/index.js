import { combineReducers } from 'redux';
import login from './login';
import player from './player';

const rootReducers = combineReducers({
  login,
  player,
});

export default rootReducers;
