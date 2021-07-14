import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <div className="App-header">
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
        <section>
          <input
            data-testid="input-player-name"
            name="name"
            type="text"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            name="gravatarEmail"
            type="email"
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            disabled={ !(name && gravatarEmail) }
            type="button"
          >
            Jogar
          </button>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </section>
      </div>
    );
  }
}
