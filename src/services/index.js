const questionAPI = async () => {
  const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const dataToken = await fetchApiToken.json();
  const token = await dataToken.token;
  await localStorage.setItem('token', dataToken.token);
  const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&type=multiple&token=${token}`);
  const data = await fetchApi.json();
  return data;
};

export default questionAPI;
