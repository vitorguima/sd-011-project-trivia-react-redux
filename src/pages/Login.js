import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { fetchToken, actionLogin } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.handleBtn = this.handleBtn.bind(this);

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  checkLogin() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleBtn() {
    const { getToken, getLogin } = this.props;
    const { name, email } = this.state;
    getToken();
    getLogin(name, email);
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });

    this.checkLogin();
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form>
            <label htmlFor="name">
              Nome:
              <input
                onChange={ this.handleChange }
                data-testid="input-player-name"
                type="text"
                id="name"
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                type="email"
                id="email"
              />
            </label>
          </form>
          <Link to="/game">
            <button
              disabled={ disabled }
              type="button"
              data-testid="btn-play"
              onClick={ this.handleBtn }
            >
              Jogar
            </button>
          </Link>

        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getLogin: (name, gravatarEmail) => dispatch(actionLogin(name, gravatarEmail)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getToken: PropTypes.func,
}.isRequired;
