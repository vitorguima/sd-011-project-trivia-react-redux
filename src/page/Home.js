import React, { Component } from 'react';
import logo from '../trivia.png';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.handleData = this.handleData.bind(this);
  }

  handleData({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              data-testid="input-player-name"
              name="name"
              onChange={ (value) => this.handleData(value) }
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ (value) => this.handleData(value) }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(name && email) }
          >
            Jogar
          </button>
        </header>
      </div>
    );
  }
}
