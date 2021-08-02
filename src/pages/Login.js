import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.isEnabled = this.isEnabled.bind(this);
    this.state = {
      disabled: true,
      name: '',
      email: '',
    };
  }

  async requestToken() {
    const { props: { requestQuestions },
      state: { name, email } } = this;
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        email,
      },
    };
  
  }

  isEnabled() {
    const { state: { name, email } } = this;
    if (name.length > 0 && email.length > 0) {
      this.setState((prev) => ({
        ...prev,
        disabled: false,
      }));
    } 
  }

  handleChange({ target: { id, value } }) {
    this.setState((prev) => ({
      ...prev, [id]: value,
    }), () => this.isEnabled());
  }

  render() {
    const { state: { disabled },handleChange } = this;
    return (
        <form>
          <label htmlFor="name">
            Name:
            <input
              onChange={ handleChange }
              data-testid="input-player-name"
              id="name"
              type="text"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              onChange={ handleChange }
              data-testid="input-gravatar-email"
              id="email"
              type="email"
            />
          </label>
          <button disabled={ disabled } data-testid="btn-play" type="button">Jogar</button>
        </form>
    );
  }
}
export default Login;