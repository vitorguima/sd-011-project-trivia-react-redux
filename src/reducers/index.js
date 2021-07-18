import { combineReducers } from 'redux';
import user from './user';
import triviaReducer from './triviaReducer';

const rootReducer = combineReducers({
  user,
  triviaReducer,
});

export default rootReducer;
