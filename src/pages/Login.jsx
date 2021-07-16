import React, { Component } from 'react';
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
            onClick={ () => history.push('/game') }
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
