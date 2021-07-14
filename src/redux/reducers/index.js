import { combineReducers } from 'redux';

const INITIAL_REDUC = '';

function homeReducer(state = INITIAL_REDUC, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default combineReducers({
  homeReducer,
});
