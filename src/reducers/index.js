import { combineReducers } from 'redux';
import login from './login';
import game from './game';
import settings from './settings';

const rootReducer = combineReducers({ login, game, settings });

export default rootReducer;
