import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      // disabled: true,
      playerName: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderPlayButton = this.renderPlayButton.bind(this);
  }

  handleChange(target) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  renderPlayButton() {
    const { playerName, email } = this.state;
    if (playerName.length && email.length) {
      return false;
    }
    return true;
  }

  render() {
    const { email, playerName } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-name">
            Nome Jogador
            <input
              name="playerName"
              value={ playerName }
              type="text"
              id="input-name"
              data-testid="input-player-name"
              placeholder="nome"
              onChange={ ({ target }) => { this.handleChange(target); } }
            />
          </label>
          <label htmlFor="input-email">
            Email
            <input
              name="email"
              value={ email }
              type="email"
              id="input-email"
              data-testid="input-gravatar-email"
              placeholder="email"
              onChange={ ({ target }) => { this.handleChange(target); } }
            />
          </label>
          <button
            disabled={ this.renderPlayButton() }
            type="button"
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}
