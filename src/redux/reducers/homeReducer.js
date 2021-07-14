const INITIAL_STATE = {
  token: {},
};

function homeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_SUCCESS':
    localStorage.setItem('token', JSON.stringify(action.payload.token));
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
}

export default homeReducer;
