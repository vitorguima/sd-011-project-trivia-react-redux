import { ADD_RANKING_NAME, ADD_RANKING_PICTURE, ADD_RANKING_SCORE } from '../actions';

const initialState = {};

function ranking(state = initialState, action) {
  switch (action.type) {
  case ADD_RANKING_NAME:
    return { ...state, ...state, name: action.payload };
  case ADD_RANKING_SCORE:
    return { ...state, score: action.payload };
  case ADD_RANKING_PICTURE:
    return { ...state, picture: action.payload };
  default:
    return state;
  }
}

export default ranking;
