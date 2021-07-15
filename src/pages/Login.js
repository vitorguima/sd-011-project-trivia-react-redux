import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validateLogin() {
    const { name, email } = this.state;
    const ln = 3;
    const nameLen = name.length;
    const reg = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (reg.test(email) && nameLen >= ln) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,

    }, () => this.validateLogin());
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form>
          <label htmlFor="inputName">
            Nome
            <input
              data-testid="input-player-name"
              name="name"
              type="text"
              // value={ nome }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="inputEmail">
            E-mail
            <input
              data-testid="input-gravatar-email"
              name="email"
              type="email"
              // value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ buttonDisabled }
          >
            Jogar
          </button>
          <Link to="/settings" data-testid="btn-settings">
            <button>
              Setings
            </button>
          </Link>
        </form>
        </header>

       
      </>
    );
  }
}
