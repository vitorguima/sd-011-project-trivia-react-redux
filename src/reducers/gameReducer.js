import { REQUEST_QUESTS, REQUEST_SUCCESS_QUESTS } from '../actions';

const INITIAL_STATE = {
  apiQuests: {},
  loading: true,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTS:
    return {
      loading: true,
    };
  case REQUEST_SUCCESS_QUESTS:
    return {
      loading: false,
      apiQuests: action.payload,
    };
  default:
    return state;
  }
}

export default gameReducer;
