import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  verifyLogin() {
    const { name, email } = this.state;
    const si = /\S+@\S+\.\S+/;
    const no = /\S/;
    if (si.test(email) && no.test(name)) {
      return false;
    }
    return true;
  }

  handleClick() {
    const { email, name } = this.state;
    localStorage.setItem(
      'state',
      JSON.stringify({
        player: {
          name,
          assertions: 0,
          score: 0,
          gravatarEmail: email,
          gravatarHash: md5(email).toString(),
        },
      }),
    );
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            name="name"
            value={ name }
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            type="email"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/game">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.verifyLogin() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings" data-testid="btn-settings">Configurações</Link>
      </div>
    );
  }
}

export default Login;
