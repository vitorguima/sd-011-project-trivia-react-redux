import md5 from 'crypto-js/md5';

export const getToken = async () => {
  const fetchEndpoint = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await fetchEndpoint.json();
  return data;
};

export const getQuestions = async (token) => {
  const fetchEndpoint = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  console.log(`https://opentdb.com/api.php?amount=5&token=${token}`);
  console.log(fetchEndpoint);
  const data = await fetchEndpoint.json();
  console.log(data);
  return data;
};

export const getGravatar = async (email) => {
  const hash = md5(email).toString();
  const result = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  return result;
};
