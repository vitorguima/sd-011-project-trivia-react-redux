import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState({ target: { id, value } }) {
    const { name, email } = this.state;
    this.setState({ [id]: value });
    if (name && email) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { disabled, email, name } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            data-testid="input-player-name"
            type="email"
            placeholder="Email"
            id="email"
            value={ email }
            onChange={ this.changeState }
          />
          <input
            data-testid="input-gravatar-email"
            type="text"
            placeholder="Name"
            id="name"
            value={ name }
            onChange={ this.changeState }
          />
          <button disabled={ disabled } type="button" data-testid="btn-play">
            Jogar
          </button>
        </header>
      </div>
    );
  }
}

export default Login;
