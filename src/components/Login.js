import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from './PlayButton';
// import Button from './Button';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gravatarEmail: '',
      name: '',
    };
  }

  handleLoginBtn() {
    const { gravatarEmail, name } = this.state;
    const playerInfo = this.state;
    localStorage.setItem('player', JSON.stringify(playerInfo));
    const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailRegexp.test(gravatarEmail) && name) {
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
    const { gravatarEmail, name } = this.state;
    return (
      <div>
        <label htmlFor="gravatarEmail">
          Email do Gravatar:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="gravatarEmail"
            required
            onChange={ (e) => this.handleInputText(e) }
          />
        </label>
        <label htmlFor="name">
          Nome do Jogador:
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            required
            onChange={ (e) => this.handleInputText(e) }
          />
        </label>
        <PlayButton
          disabled={ this.handleLoginBtn() }
          gravatarEmail={ gravatarEmail }
          name={ name }
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
