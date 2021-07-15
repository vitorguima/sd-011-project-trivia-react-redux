import md5 from 'crypto-js/md5';

export const USER_DATA = 'USER_DATA';

export const getUserData = (name, email, token) => {
  const hash = md5(email).toString();
  return {
    type: USER_DATA,
    name,
    email,
    token,
    gravatarImage: `https://www.gravatar.com/avatar/${hash}`,
  };
};
