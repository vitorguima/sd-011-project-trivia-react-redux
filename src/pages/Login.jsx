import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { loginAction } from '../actions';

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

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => { this.checkInputs(); });
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

  handleLogin() {
    const { name, email } = this.state;
    const { setLogin } = this.props;
    setLogin(name, email);
    this.setState({
      ready: true,
    });
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
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ () => this.handleLogin() }
          >
            Jogar
          </button>
        </form>
        { ready && <Redirect to="/game" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLogin: (name, email) => dispatch(loginAction({ name, email })),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setLogin: PropTypes.func.isRequired,
};
