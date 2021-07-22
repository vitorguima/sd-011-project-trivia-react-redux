import { combineReducers } from 'redux';
import user from './user';
import requestGameAPI from './requestGameAPI';

const reducer = combineReducers({ user, requestGameAPI });

export default reducer;
