import { REQUEST_API, GET_GAME } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  gameData: [],
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case GET_GAME:
    return {
      ...state,
      isLoading: false,
      gameData: action.data,
    };
  default:
    return state;
  }
}

export default gameReducer;
