export const SET_AVATAR = 'SET_AVATAR';
export const SET_NAME = 'SET_NAME';
export const SET_BTN_HIDDEN = 'SET_BTN_HIDDEN';
export const SET_CLICKED = 'SET_CLICKED';
export const SET_TIMER = 'SET_TIMER';

export const actionAvatar = (avatarUrl) => ({
  type: SET_AVATAR,
  payload: avatarUrl,
});

export const actionName = (name) => ({
  type: SET_NAME,
  payload: name,
});

export const actionBtn = (button) => ({
  type: SET_BTN_HIDDEN,
  payload: button,
});

export const actionClicked = (clicked) => ({
  type: SET_CLICKED,
  payload: clicked,
});

export const actionTimer = (timer) => ({
  type: SET_TIMER,
  payload: timer,
});
