import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from './PlayButton';
// import Button from './Button';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      playerName: '',
    };
  }

  handleLoginBtn() {
    const { email, playerName } = this.state;
    const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailRegexp.test(email) && playerName) {
      return false;
    }
    return true;
  }

  handleInputText({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, playerName } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email do Gravatar:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            required
            onChange={ (e) => this.handleInputText(e) }
          />
        </label>
        <label htmlFor="playerName">
          Nome do Jogador:
          <input
            data-testid="input-player-name"
            type="text"
            name="playerName"
            required
            onChange={ (e) => this.handleInputText(e) }
          />
        </label>
        <PlayButton
          disabled={ this.handleLoginBtn() }
          email={ email }
          playerName={ playerName }
        />
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configuração
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
