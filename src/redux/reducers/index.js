import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import gameReduce from './GameReduce';

export default combineReducers({ homeReducer, gameReduce });
