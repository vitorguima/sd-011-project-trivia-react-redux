import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../services/api';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: 'Matheus',
      email: 'mathws.costag@gmail.com',
    };
    this.saveToken = this.saveToken.bind(this);
  }

  async saveToken() {
    const { token } = await getToken();
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { nome, email } = this.state;
    const active = !(nome && email);
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ active }
              onClick={ this.saveToken }
            >
              Jogar
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

export default Login;
