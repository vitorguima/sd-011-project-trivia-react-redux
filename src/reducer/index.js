import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';
import ranking from './ranking';

const rootReducer = combineReducers({
  user, questions, ranking,
});

export default rootReducer;
