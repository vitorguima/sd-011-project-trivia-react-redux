// Actions
export const REQUEST_API = 'REQUEST_API';
export const GET_GAME = 'GET_GAME';

export const requestAPI = () => ({ type: REQUEST_API });

export const getGameAction = (data) => ({ type: GET_GAME, data });

export const fetchGameAction = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    // Esta parte obtem o token e armazena no localStorage
    const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenJson = await tokenResponse.json();
    localStorage.setItem('token', JSON.stringify(tokenJson));
    // Esta parte, utiliza o token obtido na primeira chamada para fazer uma nova chamada e obter as questões
    const { token } = tokenJson;
    const gameResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const gameJson = await gameResponse.json();
    dispatch(getGameAction(gameJson));
  } catch (error) {
    console.log(error);
  }
};
