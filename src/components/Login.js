import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetchToken from '../services/Api';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      email: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { user, email } = this.state;
      if (user.length > 0 && email.length > 0) {
        this.setState({
          isDisabled: false,
        });
      }
    });
  }

  handleClick() {
    fetchToken();
  }

  render() {
    const { isDisabled, user, email } = this.state;
    return (
      <div>
        <h1>Trivia</h1>
        <input
          type="text"
          name="user"
          value={ user }
          placeholder="nome"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="email"
          value={ email }
          placeholder="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <Link to="/gameplay">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
