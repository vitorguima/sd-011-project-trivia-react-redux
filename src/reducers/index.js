import { combineReducers } from 'redux';
import user from './user';

import questionsApi from './questionsApi';

const rootReducer = combineReducers({ user, questionsApi });

import apiQuestion from './apiQuestion';

const rootReducer = combineReducers({ user, apiQuestion });

export default rootReducer;
