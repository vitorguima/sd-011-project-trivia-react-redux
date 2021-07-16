import { combineReducers } from 'redux';
import user from './userReducer';
import questions from './questionsReducer';

const rootReducer = combineReducers({ user, questions });

export default rootReducer;
