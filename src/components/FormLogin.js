import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormLogin extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <form id="form-login">
        <label htmlFor="name">
          Nome
          <input
            id="name"
            data-testid="input-player-name"
            type="text"
            required
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="email"
            required
            onChange={ handleChange }
          />
        </label>
        <button
          id="button-login"
          data-testid="btn-play"
          type="button"
          disabled
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
