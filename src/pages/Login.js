import React from 'react';
import logo from '../trivia.png';
import '../App.css';
import ScreamLogin from '../components/componentsLogin/FormLogin';

const Login = () => (
  <header className="App-header">
    <img src={ logo } className="App-logo" alt="logo" />
    <ScreamLogin />
    <p>
      SUA VEZ
    </p>
  </header>
);

export default Login;
