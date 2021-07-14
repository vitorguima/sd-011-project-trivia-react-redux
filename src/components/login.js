import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  handler(e) {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  }

  isAuthenticated() {
    const { email, name } = this.state;
    const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailRegexp.test(email) && name.length > 0) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <input
          data-testid="input-player-name"
          name="name"
          type="text"
          placeholder="Escreva seu nome"
          onChange={ (e) => this.handler(e) }
        />
        <input
          data-testid="input-gravatar-email"
          name="email"
          type="email"
          placeholder="email"
          onChange={ (e) => this.handler(e) }
        />
        <button
          data-testid="btn-play"
          type="button"
          disabled={ this.isAuthenticated() }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
