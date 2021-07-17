export function getPlayerLocalStorage() {
  return JSON.parse(localStorage.getItem('state'));
}

export function updateScoreLocalStorage(newState) {
  return localStorage.setItem('state', JSON.stringify(newState));
}
