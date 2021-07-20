import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
  playerReducer,
  gameReducer,
  timerReducer,
});

export default rootReducer;
