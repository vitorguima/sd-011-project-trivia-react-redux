const INITIAL_STATE = {
  ranking: [],
};

const rankingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_PLAYER_RANK':
    return {
      ...state,
      ranking: [...state.ranking, action.payload],
    };
  default:
    return state;
  }
};

export default rankingReducer;
