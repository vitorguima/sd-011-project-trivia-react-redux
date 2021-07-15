import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import playerReducer from './playerReducer';

export default combineReducers({
  loginReducer,
  playerReducer,
});
