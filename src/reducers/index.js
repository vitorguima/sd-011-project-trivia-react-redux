import { combineReducers } from 'redux';
import userLogin from './userLogin';
import questionsArray from './questions';

const rootReducer = combineReducers({ userLogin, questionsArray });

export default rootReducer;
