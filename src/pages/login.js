import React, { Component } from 'react';
// import logo from './trivia.png';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      user: '',
      disableBtn: true,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleLogin();
    });
  }

  handleLogin() {
    const { email, user } = this.state;
    if (email !== '' && user !== '') {
      this.setState({
        disableBtn: false,
      });
    } else {
      this.setState({
        disableBtn: true,
      });
    }
  }

  render() {
    const { disableBtn } = this.state;
    return (
      <form>
        <label htmlFor="user">
          Usuário
          <input
            data-testid="input-player-name"
            id="user"
            name="user"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disableBtn }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default login;
