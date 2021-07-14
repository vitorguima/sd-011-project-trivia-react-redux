import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLogin } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
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

  handlePlayButton() {
    const { name, email } = this.state;
    const { login } = this.props;
    login(name, email);
  }

  render() {
    const { name, email } = this.state;
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
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handlePlayButton }
              disabled={ !this.checkForm() }
            >
              Jogar
            </button>
          </Link>
        </form>
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
