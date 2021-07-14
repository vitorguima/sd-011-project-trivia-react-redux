import React, { Component } from 'react';
import FormLogin from '../components/FormLogin';
import { getToken } from '../services/api';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      nome: '',
      email: '',
    };
    this.validation = this.validation.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleInput = this.handleInput.bind(this);

  }

  validation() {
    const { nome, email } = this.state;
    if (!nome || !email) {
      return true;
    }
    return false;
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleButton() {
    //const token = getToken();
    console.log('alo alo marciano');
  }

  render() {
    return (
      <div>
        <FormLogin
          validation={ this.validation }
          nome={ this.nome }
          email={ this.email }
          handleButton={ this.handleButton }
          handleInput={ this.handleInput }
        />
      </div>
    );
  }
}

export default Login;
