const INITIAL_STATE = {
  token: {},
  user: {
    email: '',
    name: '',
    hash: '',
  },
};

function homeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_SUCCESS':
    localStorage.setItem('token', JSON.stringify(action.payload.token));
    return {
      ...state,
      token: action.payload,
    };
  case 'SET_USER':
    return {
      ...state,
      user: {
        email: action.email,
        name: action.name,
        hash: action.hash,
      },
    };
  default:
    return state;
  }
}

export default homeReducer;
