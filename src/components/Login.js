import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      playerEmail: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidUpdate() {
    this.validateInput();
  }

  validateInput() {
    const { playerName, playerEmail, disabled } = this.state;
    if (playerName && playerEmail && disabled) {
      this.setState({
        disabled: false,
      });
    } else if ((!playerName || !playerEmail) && !disabled) {
      this.setState({
        disabled: true,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { playerName, playerEmail, disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <label htmlFor="player-name">
            <input
              data-testid="input-player-name"
              type="text"
              placeholder="Digite o nome do jogador"
              name="playerName"
              value={ playerName }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="player-email">
            <input
              data-testid="input-gravatar-email"
              type="email"
              placeholder="Digite o seu e-mail"
              name="playerEmail"
              value={ playerEmail }
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ disabled }
            >
              Jogar
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

export default Login;
