import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import logo from '../trivia.png';

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Login />
          <Link to="/config">
            <button type="button" data-testid="btn-settings">Configurações</button>
          </Link>
        </header>
      </div>
    );
  }
}
