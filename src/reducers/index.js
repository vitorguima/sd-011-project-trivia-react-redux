import { combineReducers } from 'redux';
import reducerToken from './reducerToken';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({ reducerToken, questionReducer });

export default rootReducer;
