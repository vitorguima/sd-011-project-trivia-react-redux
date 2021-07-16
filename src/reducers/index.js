import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';
import timerReducer from './timerReducer';

const rootReducers = combineReducers({
  questionsReducer,
  timerReducer,
});

export default rootReducers;
