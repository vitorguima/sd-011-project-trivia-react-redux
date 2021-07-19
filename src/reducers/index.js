import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import questionsReducer from './questionsReducer';
import countDownReducer from './countDownReducer';

const rootReducer = combineReducers({ loginReducer, questionsReducer, countDownReducer });

export default rootReducer;
