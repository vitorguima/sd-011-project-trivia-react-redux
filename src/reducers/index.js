import { combineReducers } from 'redux';
import homeReducer from './HomeReducer';
import login from './login';

const rootReducer = combineReducers({ homeReducer, login });

export default rootReducer;
