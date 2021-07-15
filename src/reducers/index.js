import { combineReducers } from 'redux';
import email from './inputEmail';
import fetchReducers from './fetchReducers';

const rootReducer = combineReducers({
  fetchReducers,
  email,
});

export default rootReducer;
