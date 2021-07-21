import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Login.css';
import logo from '../trivia.png';

import { getLogin } from '../actions';

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
    const { name, email } = this.state;
    const { login } = this.props;
    login(name, email);
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    const data = JSON.stringify(player);

    if (localStorage.getItem('state')) localStorage.removeItem('state');

    localStorage.setItem('state', data);
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => {
        response.json()
          .then((json) => {
            localStorage.setItem('token', json.token);
            this.setState({ play: true });
          });
      });
  }

  render() {
    const { name, email, play } = this.state;
    return (
      <div className="login-container">
        { play ? <Redirect to="/game" /> : null }
        <div className="img-form-wrapper">
          <img src={ logo } className="App-logo" alt="logo" />
          <form className="login-form">
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
              className="btn play"
              onClick={ () => this.handlePlayButton() }
              disabled={ !this.checkForm() }
            >
              Jogar
            </button>
            <Link
              className="btn config"
              data-testid="btn-settings"
              to="/config"
            >
              Configurações
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (name, email) => dispatch(getLogin(name, email)),
});

Login.propTypes = {
  login: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
