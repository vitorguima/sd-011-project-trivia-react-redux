import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',

    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.checkForm = this.checkForm.bind(this);
    this.buttonIsDisable = this.buttonIsDisable.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  componentDidMount() {
    this.buttonIsDisable();
  }

  checkForm() {
    const { email, name } = this.state;
    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && name.length > 0);
  }

  buttonIsDisable() {
    const button = document.getElementById('btn-play');
    const formValid = this.checkForm();

    if (formValid) button.disabled = false;
    else button.disabled = true;
  }

  async handleFormChange({ target: { id, value } }) {
    await this.setState((oldState) => ({
      ...oldState,
      [id]: value,
    }));
    this.buttonIsDisable();
  }

  async handleButton() {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((resolve) => {
        const { name, email } = this.state;
        const player = {
          name,
          assertions: 0,
          score: 0,
          gravatarEmail: email,
        };
        localStorage.setItem('token', resolve.token);
        localStorage.setItem('state', JSON.stringify(player));
      });
  }

  render() {
    const { name, email } = this.state;
    console.log(this.state);
    return (
      <header className="App-header">
        <img src={ logo } height="150px" alt="logo" />
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              id="name"
              onChange={ this.handleFormChange }
              type="text"
              value={ name }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="input-gravatar-email"
              id="email"
              onChange={ this.handleFormChange }
              type="email"
              value={ email }
            />
          </label>
          <Link to="/trivia">
            <button
              type="button"
              id="btn-play"
              data-testid="btn-play"
              onClick={ () => this.handleButton() }
            >
              Jogar
            </button>
            <Link to="/settings">
              <button type="button" data-testid="btn-settings">Configurações</button>
            </Link>
          </Link>
        </form>
      </header>
    );
  }
}

export default connect()(Login);
