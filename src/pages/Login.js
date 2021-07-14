import React from 'react';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  disableButton(username, email) {
    return username.length === 0 || email.length === 0;
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
            <button
              type="button"
              data-testid="btn-play"
              disabled={ this.disableButton(username, email) }
            >
              Jogar!
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
