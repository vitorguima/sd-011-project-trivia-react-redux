import {
  UPDATE_CATEGORY,
} from '../actions';

const INITIAL_STATE = {
  category: 0,
};

const configurationReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case UPDATE_CATEGORY:
    return {
      ...state,
      category: payload,
    };
  default:
    return state;
  }
};

export default configurationReducer;
