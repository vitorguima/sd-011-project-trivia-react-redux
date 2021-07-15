import { combineReducers } from 'redux';
import questions from './questions';
import userReducer from './user';

const rootReducers = combineReducers({ questions, userReducer });

export default rootReducers;
