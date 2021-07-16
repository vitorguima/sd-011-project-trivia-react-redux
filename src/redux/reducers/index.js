import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import gameReducer from './gameReducer';
import rankingReducer from './rankingReducer';

export default combineReducers({
  homeReducer,
  gameReducer,
  rankingReducer,
});
