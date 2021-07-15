const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',

};

const userReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case 'CHANGE_EMAIL':
    return {
      ...state,
      gravatarEmail: payload,
    };
  case 'CHANGE_NAME':
    return {
      ...state,
      name: payload,
    };
  default:
    return state;
  }
};

export default userReducer;
