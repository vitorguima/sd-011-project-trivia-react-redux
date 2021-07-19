import { combineReducers } from 'redux';
import login from './login';
import playerReducer from './player';

const reducer = combineReducers({ login, playerReducer });

export default reducer;
