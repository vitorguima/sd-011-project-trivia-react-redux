import React, { Component } from 'react';
import FormLogin from '../components/FormLogin';

class Login extends Component {
  handleChange() {
    const form = document.querySelector('#form-login');
    const button = document.querySelector('#button-login');
    button.disabled = !form.checkValidity();
  }

  render() {
    return (
      <div>
        <FormLogin handleChange={ this.handleChange } />
      </div>
    );
  }
}

export default Login;
