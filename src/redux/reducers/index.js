import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  loginReducer,
  playerReducer,
  gameReducer,
});
