import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  homeReducer,
  gameReducer,
});
