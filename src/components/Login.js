import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkForm = this.checkForm.bind(this);
    // this.handlePlayButton = this.handlePlayButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  checkForm() {
    const { name, email } = this.state;
    return name !== '' && email !== '';
  }

  // handlePlayButton() {

  // }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            onChange={ this.handleChange }
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            placeholder="Digite seu nome"
          />
          <input
            onChange={ this.handleChange }
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            placeholder="Digite seu email"
          />
          <Link to="/triviagame">
            <button
              type="button"
              data-testid="btn-play"
              // onClick={ this.handlePlayButton }
              disabled={ !this.checkForm() }
            >
              Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
