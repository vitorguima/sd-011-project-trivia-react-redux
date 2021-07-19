import { combineReducers } from 'redux';
import user from './user';
import apiQuestion from './apiQuestion';

const rootReducer = combineReducers({ user, apiQuestion });

export default rootReducer;
