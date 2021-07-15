import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';

class config extends Component {
  render() {
    return (
      <div data-testid="settings-title" className="App App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <div className="container-login">
          <p>Página em desenvolvimento!</p>
          <Link to="/" className="btn-link">
            <button
              type="button"
              className="btn"
            >
              Voltar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default config;
