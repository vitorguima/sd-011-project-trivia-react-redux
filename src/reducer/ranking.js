import { ADD_RANKING } from '../actions';

const initialState = {
  ranking: [],
};

function ranking(state = initialState, action) {
  switch (action.type) {
  case ADD_RANKING:
    return { ...state, ranking: [...state.ranking, action.payload] };
  default:
    return state;
  }
}

export default ranking;
