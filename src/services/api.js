import md5 from 'crypto-js/md5';

export const getToken = async () => {
  const fetchEndpoint = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await fetchEndpoint.json();
  return data;
};

export const getQuastion = async (token) => {
  const fetchEndpoint = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await fetchEndpoint.json();
  return data;
};

export const getGravatar = async (email) => {
  const hash = md5(email).toString();
  const result = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  console.log(result);
  return result;
};

getGravatar('laura@gmail.com');
