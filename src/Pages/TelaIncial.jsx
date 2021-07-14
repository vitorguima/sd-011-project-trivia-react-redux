import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';

export default class TelaIncial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      button: true,
    };
    this.activeButton = this.activeButton.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  activeButton() {
    const { email, name } = this.state;
    const regex = /\w+@\w+.com(.br)?/;
    if (regex.test(email) && name.length > 0) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  handleInput({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, () => activeButton());
  }

  render() {
    const { email, name, button } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            name="email"
            data-testid="input-gravatar-email"
            type="text"
            onChange={ handleInput }
            placeholder="email"
          />
          <input
            name="name"
            data-testid="input-gravatar-email"
            type="text"
            onChange={ handleInput }
            placeholder="nome"
          />
          <Link
            to="/Play"
          >
            <button
              type="button"
              disabled={ button }
              data-testid="btn-play"
              onClick={ () => emailLogin(email, name) }
            >
              Entrar
            </button>
          </Link>

        </header>
      </div>
    );
  }
}
