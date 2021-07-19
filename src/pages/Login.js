import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { thunkToken } from '../actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      buttonDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  validateLogin() {
    const { name, email } = this.state;
    const ln = 3;
    const nameLen = name.length;
    const reg = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (reg.test(email) && nameLen >= ln) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,

    }, () => this.validateLogin());
  }

  handleClick() {
    const { actionBtn } = this.props;
    actionBtn();
  }

  submit() {
    const { name, email } = this.state;
    const hash = md5(email).toString();
    localStorage.state = JSON.stringify({
      player: {
        name,
        gravatarEmail: `https://www.gravatar.com/avatar/${hash}`,
        score: 0,
        assertions: 0,
      },
    });
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="inputName">
            Nome
            <input
              data-testid="input-player-name"
              name="name"
              type="text"
              // value={ nome }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="inputEmail">
            E-mail
            <input
              data-testid="input-gravatar-email"
              name="email"
              type="email"
              // value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <Link to="jogo">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ buttonDisabled }
              onClick={ () => { this.handleClick(); this.submit(); } }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings" data-testid="btn-settings">
            <button type="button">
              Setings
            </button>
          </Link>
        </form>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionBtn: () => dispatch(thunkToken()),
});

Login.propTypes = {
  actionBtn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
