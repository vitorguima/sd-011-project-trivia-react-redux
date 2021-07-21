import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  handleChange({ target }) {
    // Event.target: https://developer.mozilla.org/en-US/docs/Web/API/Event/target
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { name, email } = this.state;
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        gravatarEmail: email,
        gravatarHash: md5(email).toString(),
        assertions: 0,
        score: 0,
      },
    }));
  }

  loginValidation() { // RegExp test
    const { name, email } = this.state;
    const rtEmail = /\S+@\S+\.\S+/;
    const rtName = /\S/;
    if (rtEmail.test(email) && rtName.test(name)) return false;
    return true;
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <br />
        <div>
          <label htmlFor="name">
            Nome:
            <input
              name="name"
              data-testid="input-player-name"
              value={ name }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              name="email"
              data-testid="input-gravatar-email"
              value={ email }
              type="email"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <br />
        <Link to="/game">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.loginValidation() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
        <div>
          <br />
          <Link to="/settings" data-testid="btn-settings">Configurações</Link>
        </div>
      </div>
    );
  }
}
