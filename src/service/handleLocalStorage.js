export const getFromStore = () => {
  const store = JSON.parse(localStorage.getItem('state'));
  return store;
};

export const saveTokenToStore = (value) => {
  localStorage.setItem('token', JSON.stringify(value));
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
