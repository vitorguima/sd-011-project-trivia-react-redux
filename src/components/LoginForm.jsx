import React from 'react';
import PropTypes from 'prop-types';

export default function LoginForm(props) {
  const { handleSubmit, handleChange, handleDisabled } = props;

  return (
    <form className="w-25 login-form " onSubmit={ (e) => handleSubmit(e) }>
      <div className="mb-3">
        <label htmlFor="inputEmail" className="form-label">
          Email address
          <input
            onChange={ (e) => handleChange(e) }
            name="email"
            data-testid="input-gravatar-email"
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
          />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword" className="form-label">
          Name
          <input
            onChange={ (e) => handleChange(e) }
            name="name"
            data-testid="input-player-name"
            type="text"
            className="form-control"
            id="inputPassword"
          />
        </label>
      </div>
      <button
        disabled={ handleDisabled() }
        data-testid="btn-play"
        type="submit"
        className="btn btn-primary"
      >
        Jogar
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDisabled: PropTypes.func.isRequired,
};
