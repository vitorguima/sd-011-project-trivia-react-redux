import React, { Component } from 'react';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  checkLogin() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });

    this.checkLogin();
  }

  render() {
    const { name, email, disabled } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form>
            <label htmlFor="name">
              Nome:
              <input
                onChange={ this.handleChange }
                data-testid="input-player-name"
                type="text"
                id="name"
                value={ name }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                type="email"
                id="email"
                value={ email }
              />
            </label>
          </form>
          <button
            disabled={ disabled }
            type="button"
            data-testid="btn-play"
          >
            Jogar
          </button>
        </header>
      </div>
    );
  }
}

export default Login;
