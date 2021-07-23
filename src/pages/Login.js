import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail, setName } from '../actions';
import Logo from '../trivia.png';
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.saveTokenInLocalStorage = this.saveTokenInLocalStorage.bind(this);
    this.savePlayerScoreInLocalStorage = this.savePlayerScoreInLocalStorage.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.settingsButton = this.settingsButton.bind(this);
  }

  componentDidMount() {
    this.saveTokenInLocalStorage();
    this.savePlayerScoreInLocalStorage();
  }

  componentDidUpdate() {
    const actualToken = localStorage.getItem('token');
    if (!actualToken) {
      this.saveTokenInLocalStorage();
    }
    this.savePlayerScoreInLocalStorage();
  }

  settingsButton() {
    return (
      <Link to="/settings">
        <button
          data-testid="btn-settings"
          type="button"
          className="settings-button"
        >
          <span role="img" aria-label="Gear">⚙️</span>
          Configurações
        </button>
      </Link>
    );
  }

  saveTokenInLocalStorage() {
    const API_URL = 'https://opentdb.com/api_token.php?command=request';
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => localStorage.setItem('token', data.token));
  }

  savePlayerScoreInLocalStorage() {
    const { name, email } = this.state;
    const player = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    } };
    localStorage.setItem('state', JSON.stringify(player));
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleButton());
  }

  handleButton() {
    const { email, name, disabled } = this.state;
    const emailChek = email.split('').includes('@') && email.split('.').includes('com');
    const nameLength = name.length > 0;
    if (nameLength && emailChek && disabled) {
      this.setState({
        disabled: false,
      });
    } else if ((!nameLength || !emailChek) && !disabled) {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { email, name, disabled } = this.state;
    const { setCredentials } = this.props;
    return (
      <div className="main-page">
        <img className="trivia-logo" alt="trivia-logo" src={ Logo } />
        <div className="form">
          <label
            htmlFor="email"
          >
            Email do Gravatar:
            <input
              name="email"
              type="email"
              value={ email }
              onChange={ (e) => { this.handleInput(e); this.handleButton(); } }
              data-testid="input-gravatar-email"
            />
          </label>
          <label
            htmlFor="name"
          >
            Nome do Jogador:
            <input
              name="name"
              type="text"
              value={ name }
              onChange={ (e) => { this.handleInput(e); this.handleButton(); } }
              data-testid="input-player-name"
            />
          </label>
        </div>
        <div className="buttons">
          <Link to="./triviaquestions">
            <button
              id="login"
              data-testid="btn-play"
              type="button"
              className={ !disabled ? 'play-button enabled' : 'play-button' }
              disabled={ disabled }
              onClick={ () => setCredentials(email, name) }
            >
              Jogar
            </button>
          </Link>
          { this.settingsButton() }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCredentials: (email, name) => dispatch(setEmail(email), dispatch(setName(name))),
});

Login.propTypes = {
  setCredentials: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
