const INITIAL_STATE = 'https://opentdb.com/api.php?amount=5&token=';

function settings(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CHANGE_SETTINGS':
    return action.url;
  default:
    return state;
  }
}

export default settings;
