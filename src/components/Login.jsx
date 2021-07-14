import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <>
        <input type="text" placeholder="Nome" data-testid="input-player-name" />
        <input type="text" placeholder="Email" data-testid="input-gravatar-email" />
        <button type="button" data-testid="btn-play">Jogar</button>
      </>
    );
  }
}
