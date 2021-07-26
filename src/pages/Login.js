import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';
import getToken from '../services/index';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      redirectGame: false,
      redirectSettings: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.sendInfos = this.sendInfos.bind(this);
    this.settingsRedirect = this.settingsRedirect.bind(this);
  }

  settingsRedirect() { this.setState({ redirectSettings: true }); }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  verifyInputs() {
    const { email, name } = this.state;
    return !(name && email);
  }

  async sendInfos(event) {
    event.preventDefault();
    const { loginDispatch } = this.props;
    const { name, email } = this.state;
    loginDispatch(name, email);
    await this.callToken();
    this.setState({ redirectGame: true });
  }

  async callToken() {
    const response = await getToken();
    localStorage.setItem('token', response.token);
  }

  render() {
    const { name, email, redirectGame, redirectSettings } = this.state;
    return (
      <div className="Login">
        <img src={ logo } className="App-logo" alt="logo" />
        <form onSubmit={ this.sendInfos }>
          <input
            name="name"
            type="text"
            placeholder="Digite seu nome"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            name="email"
            type="text"
            placeholder="Digite seu e-mail"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ this.verifyInputs() }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
        <button
          type="button"
          onClick={ this.settingsRedirect }
          data-testid="btn-settings"
        >
          Configurações
        </button>
        { redirectGame && <Redirect to="/game" />}
        { redirectSettings && <Redirect to="/settings" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (name, email) => dispatch(login(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
};
