import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import rankingReducer from './rankingReducer';

const rootReducer = combineReducers({
  playerReducer,
  rankingReducer,
});

export default rootReducer;
