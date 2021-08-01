import { combineReducers } from 'redux';
import user from './user';
import gameApi from './gameApi';

const rootReducer = combineReducers({ user, gameApi });

export default rootReducer;
