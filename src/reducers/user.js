const INITIAL_STATE = {
  name: '',
  email: '',
  img: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER':
    return {
      ...state,
      name: action.state.name,
      email: action.state.email,
      img: action.state.img,
    };
  default:
    return state;
  }
}

export default userReducer;
