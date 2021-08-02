import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

store.subscribe(() => {
  const reduxState = store.getState();
  const modifyState = {
    player: {
      name: reduxState.player.name,
      assertions: reduxState.player.assertions,
      score: reduxState.player.score,
      gravatarEmail: reduxState.player.email,
    },
  };
  localStorage.setItem('state', JSON.stringify(modifyState));
});
export default store;
