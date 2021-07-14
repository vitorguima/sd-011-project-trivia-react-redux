import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <form>
        <label htmlFor="name">
          <input type="text" id="name" data-testid="input-player-name" />
        </label>
        <label htmlFor="email">
          <input type="email" id="email" data-testid="input-gravatar-email" />
        </label>
        <button type="button" data-testid="btn-play">Jogar</button>
      </form>
    );
  }
}
