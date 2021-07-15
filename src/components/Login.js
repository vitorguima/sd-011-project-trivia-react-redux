import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import InfoPlayer, { fetchToken } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handlePlayer = this.handlePlayer.bind(this);
  }

  componentDidUpdate() {
    this.validateInput();
  }

  validateInput() {
    const { name, email, disabled } = this.state;
    if (name && email && disabled) {
      this.setState({
        disabled: false,
      });
    } else if ((!name || !email) && !disabled) {
      this.setState({
        disabled: true,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handlePlayer() {
    const { getInfoPlayer, getToken } = this.props;
    const { name, email } = this.state;
    getInfoPlayer(name, email);
    await getToken(name, email);
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <label htmlFor="name">
            <input
              data-testid="input-player-name"
              type="text"
              placeholder="Digite o nome do jogador"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              type="email"
              placeholder="Digite o seu e-mail"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ disabled }
              onClick={ this.handlePlayer }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getInfoPlayer: (name, email) => dispatch(InfoPlayer(name, email)),
  getToken: (namePlayer, emailPlayer) => dispatch(fetchToken(namePlayer, emailPlayer)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getInfoPlayer: PropTypes.func,
  getToken: PropTypes.func,
}.isRequired;
