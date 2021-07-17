import React, { Component } from 'react';
import logo from '../trivia.png';

export default class Header extends Component {
  render() {
    return (
      <div className="App-">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </div>
    );
  }
}
