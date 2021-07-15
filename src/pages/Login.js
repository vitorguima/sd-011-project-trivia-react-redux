import React, { Component } from 'react';
import ConfigButton from '../components/ConfigButton';
import FormLogin from '../components/FormLogin';

class Login extends Component {
  render() {
    return (
      <div>
        <FormLogin />
        <ConfigButton />
      </div>
    );
  }
}

export default Login;
