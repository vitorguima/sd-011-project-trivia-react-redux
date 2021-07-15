import { combineReducers } from 'redux';
import userReducer from './userReducer';
import nameReducer from './nameReducer';

const rootReducer = (combineReducers(
  userReducer,
  nameReducer,
));

export default rootReducer;
