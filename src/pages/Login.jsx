import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.inputVerification = this.inputVerification.bind(this);
  }

  changeHandler({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  inputVerification() {
    const { name, email } = this.state;
    const correctEmailEntry = /(.*)@(.*).com/;

    if (correctEmailEntry.test(email) && name.length > 0) {
      return false;
    }
    return true;
  }

  submit() {
    const { email } = this.state;
    const { history } = this.props;
    const hash = md5(email).toString();
    localStorage.setItem('token', hash);
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ (event) => this.changeHandler(event) }
            placeholder="name"
          />

          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ (event) => this.changeHandler(event) }
            placeholder="email"
          />

          <input
            type="submit"
            name="email"
            value="Jogar"
            data-testid="btn-play"
            disabled={ this.inputVerification() }
            onClick={ () => this.submit() }
          />

          <input
            type="button"
            value="Configurações"
            data-testid="btn-settings"
            onClick={ () => history.push('/setting') }
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
