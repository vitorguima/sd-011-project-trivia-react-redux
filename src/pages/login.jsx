import React from 'react';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const formElement = document.getElementById('formLogin');
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.disabled = !formElement.checkValidity();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form id="formLogin" onChange={ this.handleChange }>
            <input
              type="text"
              pattern=".{5,}"
              data-testid="input-player-name"
              placeholder="Nome"
              required
            />
            <input
              type="email"
              data-testid="input-gravatar-email"
              placeholder="Email"
              required
            />
          </form>
          <button type="button" id="btnLogin" data-testid="btn-play" disabled>
            Jogar
          </button>
        </header>
      </div>
    );
  }
}

export default Login;
