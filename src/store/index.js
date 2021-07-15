import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/index';

const INITIAL_STATE = {
  questions: {
    questions: [],
    token: '',
    isFetching: true,
    error: '',
    score: 0,
  },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducers,
  INITIAL_STATE,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;