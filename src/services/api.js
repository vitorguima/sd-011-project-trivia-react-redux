const TOKEN = 'https://opentdb.com/api_token.php?command=request';

export async function fetchToken() {
  try {
    const response = await fetch(TOKEN);
    const data = await response.json();
    return data.token;
  } catch (error) {
    return error;
  }
}

export async function fetchQuestions(difficulty) {
  try {
    const token = await fetchToken();
    const response = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&token=${token}`);
    const data = await response.json();
    localStorage.setItem('token', token);
    return data;
  } catch (error) {
    return error;
  }
}
