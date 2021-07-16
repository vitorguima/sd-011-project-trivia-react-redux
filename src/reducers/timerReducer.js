import {
  BUTTONS_DISABLED_TRUE,
  BUTTONS_DISABLED_FALSE,
} from '../actions';

const INITIAL_STATE = {
  buttonsDisabledFromTimer: false,
};

export default function buttonsDisabledFromTimer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case BUTTONS_DISABLED_TRUE:
    return {
      ...state,
      buttonsDisabledFromTimer: true,
    };
  case BUTTONS_DISABLED_FALSE:
    return {
      ...state,
      buttonsDisabledFromTimer: false,
    };
  default:
    return state;
  }
}
