import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonsLogin from './ButtonsLogin';

class FormLogin extends Component {
  render() {
    const {
      validation,
      handleInput,
      handleButton,
      nome, email,
      handleSettings,
    } = this.props;
    return (
      <form className="form-login">
        <label htmlFor="name">
          Nome
          <input
            id="name"
            data-testid="input-player-name"
            type="text"
            name="nome"
            value={ nome }
            required
            onChange={ handleInput }
            placeholder="Digite your name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            required
            onChange={ handleInput }
            placeholder="Digit your email"
          />
        </label>
        <ButtonsLogin
          validation={ validation }
          handleButton={ handleButton }
          handleSettings={ handleSettings }
        />
      </form>
    );
  }
}

FormLogin.propTypes = {
  handleInput: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
  handleSettings: PropTypes.func.isRequired,
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}.isRequired;

export default FormLogin;
