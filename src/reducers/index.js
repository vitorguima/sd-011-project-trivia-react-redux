import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';

const rootReducers = combineReducers({
  questionsReducer,
});

export default rootReducers;
