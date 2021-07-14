import React, { Component } from 'react';
import Login from '../components/Login';
import logo from '../trivia.png';

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Login />
        </header>
      </div>
    );
  }
}
