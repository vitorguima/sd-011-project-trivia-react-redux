const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

async function fetchToken() {
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default fetchToken;
