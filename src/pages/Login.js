import React, { Component } from 'react';
import ConfigButton from '../components/ConfigButton';
import FormLogin from '../components/FormLogin';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="loginPageContainer">
        <FormLogin />
        <ConfigButton />
      </div>
    );
  }
}

export default Login;
