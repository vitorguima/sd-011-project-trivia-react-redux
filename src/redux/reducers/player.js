import {
  SEND_GRAVATAR_SRC_IMG,
  INCREASE_PLAYER_SCORE,
  ADD_QUESTIONS_PLAYED,
  RESET_TRIVIA_QUESTIONS_ID,
  RESET_STORE_SCORES,

} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  srcGravatarImg: '',
  token: '',
  questionsPlayed: 1,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_GRAVATAR_SRC_IMG:
    return {
      ...state,
      srcGravatarImg: action.src,
      name: action.name,
      gravatarEmail: action.email,
      token: action.token,
    };
  case INCREASE_PLAYER_SCORE:
    return {
      ...state,
      score: state.score + action.increase,
      assertions: action.assertions,
    };
  case ADD_QUESTIONS_PLAYED:
    return {
      ...state,
      questionsPlayed: state.questionsPlayed + 1,
    };
  case RESET_TRIVIA_QUESTIONS_ID:
    return {
      ...state,
      questionsPlayed: 1,
    };
  case RESET_STORE_SCORES:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };

  default:
    return state;
  }
}

export default player;
