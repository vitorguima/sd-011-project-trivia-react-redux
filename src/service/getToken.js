const getToken = async () => {
  const apiResponse = fetch('https://opentdb.com/api_token.php?command=request');
  const [api] = await Promise.all([apiResponse]);
  const apiJson = await api.json();
  const { token } = apiJson;
  return { token };
};

export default getToken;
