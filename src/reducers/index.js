import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import boardRanking from './rankingReducer';

const rootReducer = combineReducers({
  playerReducer,
  boardRanking,
});

export default rootReducer;
