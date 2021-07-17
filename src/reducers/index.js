import { combineReducers } from 'redux';
import userInfo from './userLogin';
import questionsArray from './questions';

const rootReducer = combineReducers({ userInfo, questionsArray });

export default rootReducer;
