import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormLogin extends Component {
  render() {
    const { validation, handleInput, handleButton, nome, email } = this.props;
    return (
      <form id="form-login">
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
          />
        </label>
        <button
          id="button-login"
          data-testid="btn-play"
          type="button"
          disabled={ validation() }
          onClick={ () => handleButton() }
        >
          Jogar
        </button>
      </form>
    );
  }
}

FormLogin.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default FormLogin;
