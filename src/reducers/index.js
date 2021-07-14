import { combineReducers } from 'redux';
import fetchReducers from './fetchReducers';

const rootReducer = combineReducers({
  fetchReducers,
});

export default rootReducer;
