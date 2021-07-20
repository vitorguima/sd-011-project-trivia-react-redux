import { combineReducers } from 'redux';
import game from './game';
import cronometer from './cronometer';
import player from './player';

const reducer = combineReducers({ cronometer, game, player });

export default reducer;
