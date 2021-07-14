import React, { Component } from 'react';
import logo from '../trivia.png';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleButton() {
    const { name, email } = this.state;
    const verifyEmail = email.includes('@') && email.includes('.com');
    const verifyName = name !== '';
    if (verifyEmail && verifyName) {
      return false;
    }
    return true;
  }

  render() {
    const { name, email } = this.state;
    const isEnabled = this.handleButton();
    return (
      <main>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <form>
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              placeholder="Digite seu nome"
              value={ name }
              onChange={ this.handleChange }
            />
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              placeholder="Digite seu email"
              value={ email }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isEnabled }
            >
              Jogar
            </button>
          </form>
        </header>
      </main>
    );
  }
}
