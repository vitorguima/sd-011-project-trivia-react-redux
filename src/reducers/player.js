import * as actions from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
  case actions.REQUEST_TOKEN_SUCCESS:
    return { ...state, token: action.payload };
  default:
    return state;
  }
}
