import { combineReducers } from 'redux';
import user from './user';
import questionsApi from './questionsApi';

const rootReducer = combineReducers({ user, questionsApi });

export default rootReducer;
