import md5 from 'crypto-js/md5';

export const getToken = async () => {
  const fetchEndpoint = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await fetchEndpoint.json();
  return data;
};

export const getQuestions = async (token) => {
  const fetchEndpoint = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  console.log(`https://opentdb.com/api.php?amount=5&token=${token}`);
  let data = await fetchEndpoint.json();
  if (data.response_code === 3) {
    const { token: newToken } = await getToken();
    localStorage.setItem('token', JSON.stringify(newToken));
    const newFetch = await fetch(`https://opentdb.com/api.php?amount=5&token=${JSON.parse(localStorage.getItem('token'))}`);
    data = await newFetch.json();
  }
  console.log(data);
  return data;
};

export const getGravatar = async (email) => {
  const hash = md5(email).toString();
  const result = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  return result;
};
