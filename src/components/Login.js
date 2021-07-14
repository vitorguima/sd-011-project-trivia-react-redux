import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      email: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
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
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
