import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import triviaReducer from './triviaReducer';
import gameReducer from './gameReducer';

const rootReducer = (combineReducers({ tokenReducer, triviaReducer, gameReducer }));

export default rootReducer;
