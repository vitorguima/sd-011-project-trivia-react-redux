export const fetchToken = () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => (data))
    .catch((error) => error);
};

export const fetchImage = () => {
  // const URL = `https://www.gravatar.com/avatar/${hashEmail}`;
  // return fetch(URL)
  //   .then((response) => response.json())
  //   .then((data) => data)
  //   .catch((error) => error);
};
