import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetchToken from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  async getToken() {
    const { token } = await fetchToken();
    localStorage.setItem('token', token);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const { email, name } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            data-testid="input-gravatar-email"
            value={ email }
            id="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            value={ name }
            id="name"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.getToken }
          disabled={ !email || !name }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Configurações</button>
        </Link>
      </form>
    );
  }
}
