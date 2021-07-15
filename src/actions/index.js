export const SET_AVATAR = 'SET_AVATAR';
export const SET_NAME = 'SET_NAME';

export const actionAvatar = (avatarUrl) => ({
  type: SET_AVATAR,
  payload: avatarUrl,
});

export const actionName = (name) => ({
  type: SET_NAME,
  payload: name,
});
