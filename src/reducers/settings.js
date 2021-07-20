import { QUESTION_SETTINGS } from '../actions/settings';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTION_SETTINGS:
    return {
      ...state,
      category: action.payload.selectedCategory,
      difficulty: action.payload.difficulty,
      type: action.payload.type,
    };
  default:
    return state;
  }
};

export default settings;
