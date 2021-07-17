import {
  REQUEST_API_NEW,
  REQUEST_API_NEW_SUCESS,
  REQUEST_API_NEW_ERROR,
} from '../actions/requestGameAPI';

const INITIAL_STATE = {
  gameData: {},
  isFetching: false,
};

function requestGameAPI(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case REQUEST_API_NEW:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_API_NEW_SUCESS:
    return {
      ...state,
      isFetching: false,
      gameData: action.payload,
    };
  case REQUEST_API_NEW_ERROR:
    return {
      ...state,
      isFetching: false,
      gameData: Error,
    };
  default:
    return state;
  }
}

export default requestGameAPI;
