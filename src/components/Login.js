import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      play: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkForm = this.checkForm.bind(this);
    this.handlePlayButton = this.handlePlayButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  checkForm() {
    const { name, email } = this.state;
    return name !== '' && email !== '';
  }

  async handlePlayButton() {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then(res => {
        res.json()
          .then(json => {
            localStorage.setItem('token', json.token);
            this.setState({ play: true });
          });
      });
  }

  render() {
    const { name, email, play } = this.state;

    if (play) {
      return <Redirect to="/jogo" />
    }

    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            onChange={ this.handleChange }
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            placeholder="Digite seu nome"
          />
          <input
            onChange={ this.handleChange }
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            placeholder="Digite seu email"
          />
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handlePlayButton }
            disabled={ !this.checkForm() }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
