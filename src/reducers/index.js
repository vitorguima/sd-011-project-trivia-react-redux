import { combineReducers } from 'redux';
import login from './login';
import game from './game';
import counter from './counter';

const rootReducer = combineReducers({ login, game, counter });

export default rootReducer;
