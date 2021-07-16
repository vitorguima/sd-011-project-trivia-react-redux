// Actions
export const REQUEST_API = 'REQUEST_API';
export const GET_GAME = 'GET_GAME';
export const GET_CATEGORIES = 'GET_CATEGORIES';

// ESTA ACTION MUDA O ESTADO DE isLoading para true
export const requestAPI = () => ({ type: REQUEST_API });

// ESTA ACTION APÓS AS REQUISIÇÕES, MUDA O ESTADO DE isLoading PARA false E SETA NA gameData AS PERGUNTAS E RESPOSTAS OBTIDAS DA REQUISIÇÃO
export const getGameAction = (data) => ({ type: GET_GAME, data });

// ESTA ACTION CONFIGURA AS CATEGORIAS
export const getCategoriesAction = (data) => ({ type: GET_CATEGORIES, data });

// COMBINA AS DUAS ACTIONS E CRIA O AMBIENTE THUNK PARA OCORRER O FETCH
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

export const fetchGameCategories = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const apiResponse = await fetch('https://opentdb.com/api_category.php');
    const responseJson = await apiResponse.json();
    dispatch(getCategoriesAction(responseJson));
  } catch (error) {
    console.log(error);
  }
};
