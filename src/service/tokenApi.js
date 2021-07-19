const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const responseObject = await response.json();
  await localStorage.setItem('token', JSON.stringify(responseObject));
};

export default fetchToken;
