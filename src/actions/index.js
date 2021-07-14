// Actions
export const requestAPI = () => ({ type: REQUEST_API });
export const getGame = (data) => ({ type: GET_GAME, data });

export const fetchGameAction = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const response = await fetch();
    const json = await response.json();
    console.log(json);
    dispatch(getGame(json));
  } catch (error) {
    console.log(error);
  }
};
