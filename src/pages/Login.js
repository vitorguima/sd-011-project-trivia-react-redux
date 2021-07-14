import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../services/api';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };

    this.saveToken = this.saveToken.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async saveToken() {
    const { token } = await getToken();
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { username, email } = this.state;
    return (
      <div>
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="username">
            Nome do Joagador:
            <input
              type="text"
              name="username"
              id="username"
              data-testid="input-player-name"
              value={ username }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="gravatar-email">
            Email do Gravatar:
            <input
              type="text"
              name="email"
              id="gravatar-email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
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
              disabled={ !(username && email) }
              onClick={ this.saveToken }
            >
              Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
