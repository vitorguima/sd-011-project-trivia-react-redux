import React, { Component } from 'react';
import logo from '../../trivia.png';

export default class LoginHeader extends Component {
  render() {
    return (
      <header>
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
    );
  }
}
