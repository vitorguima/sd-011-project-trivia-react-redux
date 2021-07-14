import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
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
          disabled={ !email || !name }
        >
          Jogar
        </button>
      </form>
    );
  }
}
