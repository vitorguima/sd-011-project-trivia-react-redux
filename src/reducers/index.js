import { combineReducers } from 'redux';
import login from './login';
import playerReducer from './player';
import timerReducer from './cronometer';

const reducer = combineReducers({ login, playerReducer, timerReducer });

export default reducer;
