import React, { useState } from 'react';

const Login = () => {
  const [stateLogin, setStatelogin] = useState({ email: '', userName: '' });
  const { email, userName } = stateLogin;

  const validateEmailInput = () => {
    if (email !== '' && userName !== '') {
      return false;
    } return true;
  };
  const sendValue = ({ target }) => {
    const { name, value } = target;
    setStatelogin({
      ...stateLogin,
      [name]: value,
    });
  };

  const senLogin = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request ');
    const object = await response.json();
    localStorage.setItem('token', JSON.stringify(object));
  };

  return (
    <form>
      <input
        type="email"
        name="email"
        onChange={ sendValue }
        value={ email }
        data-testid="input-gravatar-email"
      />
      <input
        type="text"
        name="userName"
        onChange={ sendValue }
        value={ userName }
        data-testid="input-player-name"
      />
      <button
        type="button"
        data-testid="btn-play"
        onClick={ senLogin }
        disabled={ validateEmailInput() }
      >
        Iniciar Jogo
      </button>
    </form>
  );
};

export default Login;
