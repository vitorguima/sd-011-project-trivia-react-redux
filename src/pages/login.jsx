import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      play: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePlayButton = this.handlePlayButton.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  async handlePlayButton() {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((res) => {
        res.json()
          .then((json) => {
            localStorage.setItem('token', json.token);
            this.setState({ play: true });
          });
      });
  }

  checkForm() {
    const { name, email } = this.state;
    return name !== '' && email !== '';
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { play } = this.state;

    if (play) {
      return <Redirect to="/Game" />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form id="formLogin">
            <input
              type="text"
              name="name"
              onChange={ this.handleChange }
              pattern=".{5,}"
              data-testid="input-player-name"
              placeholder="Nome"
              required
            />
            <input
              type="email"
              name="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              placeholder="Email"
              required
            />
          </form>
          <button
            type="button"
            id="btnLogin"
            data-testid="btn-play"
            disabled={ !this.checkForm() }
            onClick={ this.handlePlayButton }
          >
            Jogar
          </button>
          <br />
          <br />
          <Link to="/configuration">
            <button type="button" data-testid="btn-settings">Configurações</button>
          </Link>
        </header>
      </div>
    );
  }
}

export default Login;
