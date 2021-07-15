import React, { useState } from 'react';
import SendButtonLogin from './SendButtonLogin';
import SettingsButton from './SettingsButton';

const ScreamLogin = () => {
  const [stateLogin, setStatelogin] = useState({ email: '', userName: '' });
  const { email, userName } = stateLogin;
  const sendValue = ({ target }) => {
    const { name, value } = target;
    setStatelogin({
      ...stateLogin,
      [name]: value,
    });
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
      <SendButtonLogin stateLogin={ stateLogin } />
      <SettingsButton />
    </form>
  );
};

export default ScreamLogin;
