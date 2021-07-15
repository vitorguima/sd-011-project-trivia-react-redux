import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfigButton from '../components/ConfigButton';
import { loginAction, fetchToken } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isValid: false,
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleFormChange() {
    const loginForm = document.querySelector('.login-form');
    this.setState({ isValid: loginForm.checkValidity() });
  }

  render() {
    const { name, email, isValid } = this.state;
    const { token, login } = this.props;

    return (
      <div>
        <form className="login-form" onChange={ this.handleFormChange }>
          <label htmlFor="player-name">
            Nome
            <input
              id="player-name"
              data-testid="input-player-name"
              type="text"
              name="name"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="player-email">
            E-mail
            <input
              id="player-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              onChange={ this.handleChange }
              required
            />
          </label>
          <Link to="/quiz">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ !isValid }
              onClick={ () => { token(); login(name, email); } }
            >
              Jogar
            </button>
          </Link>
        </form>
        <ConfigButton />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  token: () => dispatch(fetchToken()),
  login: (name, email) => dispatch(loginAction(name, email)),
});

Login.propTypes = {
  token: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
