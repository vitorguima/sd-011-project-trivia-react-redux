import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import questions from '../reducers/questions';

const INITIAL_STATE = {
  questions: {
    questions: [],
    token: '',
    isFetching: true,
    error: '',
  },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({questions}),
  INITIAL_STATE,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;