export const resetStore = () => {
  localStorage.removeItem('state');
  const store = {
    player: {
      score: 0,
    },
  };
  localStorage.setItem('state', JSON.stringify(store));
};

export const getFromStore = () => {
  const store = JSON.parse(localStorage.getItem('state'));
  return store;
};

export const saveTokenToStore = (value) => {
  localStorage.setItem('token', JSON.stringify(value));
};

export const saveScoreToStore = (value) => {
  const defaultStore = {
    player: {
      score: 0,
    },
  };

  const receivedStore = getFromStore() || defaultStore;
  receivedStore.player.score += value;
  localStorage.setItem('state', JSON.stringify(receivedStore));
};

export const saveToStore = (key, value) => {
  const defaultStore = {
    player: {},
  };
  const receivedStore = getFromStore() || defaultStore;
  const { player } = receivedStore;
  player[key] = value;
  localStorage.setItem('state', JSON.stringify(receivedStore));
};
