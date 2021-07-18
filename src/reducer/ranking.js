import { ADD_RANKING } from '../actions';

const initialState = {
  player: {},
};

function ranking(state = initialState, action) {
  switch (action.type) {
  case ADD_RANKING:
    return { ...state, player: action.payload };
  default:
    return state;
  }
}

export default ranking;
