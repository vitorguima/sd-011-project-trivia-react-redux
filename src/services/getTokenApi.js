const getTokenApi = () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => data));

export default getTokenApi;
