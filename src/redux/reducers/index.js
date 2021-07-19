import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import gameReducer from './gameReducer';
import rankingReducer from './rankingReducer';
import settings from './settingsReducer';

export default combineReducers({
  homeReducer,
  gameReducer,
  rankingReducer,
  settings,
});
