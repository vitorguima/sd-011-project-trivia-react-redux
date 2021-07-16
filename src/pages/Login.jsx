/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { fetchToken, loginAction, fetchQuestions } from '../actions';
import {
  saveTokenToStore,
  resetStore,
} from '../service/handleLocalStorage';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      email: '',
      name: '',
      ready: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    resetStore();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => { this.checkInputs(); });
  }

  handleLocalStorage() {
    const { token } = this.props;
    saveTokenToStore(token);
  }

  async handleLogin() {
    const { name, email } = this.state;
    const { initToken, setLogin, getQuestions } = this.props;

    await initToken();
    const { token } = this.props;
    this.handleLocalStorage();
    await getQuestions(token);
    setLogin(name, email);
    this.setState({
      ready: true,
    });
  }

  checkInputs() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  redirectSettings() {
    window.location = 'configuracao';
  }

  render() {
    const { disabled, ready } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-name">
            <input
              type="text"
              id="input-name"
              name="name"
              onChange={ (e) => this.handleChange(e) }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="input-email">
            <input
              type="text"
              id="input-email"
              onChange={ (e) => this.handleChange(e) }
              name="email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            onClick={ this.handleLogin }
            data-testid="btn-play"
            disabled={ disabled }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.redirectSettings() }
          >
            Configurações
          </button>
        </form>
        { ready && <Redirect to="/game" />}
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({
  token: loginReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  initToken: () => dispatch(fetchToken()),
  setLogin: (name, email) => dispatch(loginAction({ name, email })),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Login.propTypes = ({
  initToken: PropTypes.func.isRequired,
  token: PropTypes.string,
  setLogin: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
});

Login.defaultProps = ({
  token: '',
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
