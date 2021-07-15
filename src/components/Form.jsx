import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

export default function Form(props) {
  const { handleSubmit, handleChange, handleDisabled } = props;
  const history = useHistory();
  return (
    <div>
      <form
        onSubmit={ (e) => handleSubmit(e) }
        id="UserLoginForm"
        className="form-signin"
      >
        <h2 className="form-heading">Are you ready to be challenged?</h2>
        <input
          onChange={ (e) => handleChange(e) }
          data-testid="input-gravatar-email"
          type="email"
          id="email"
          placeholder="Enter your e-mail"
          className="form-control emailInput"
          name="email"
        />
        <input
          onChange={ (e) => handleChange(e) }
          data-testid="input-player-name"
          type="name"
          id="name"
          placeholder="Enter your name"
          className="form-control nameInput"
          name="name"
        />
        <button
          data-testid="btn-play"
          disabled={ handleDisabled() }
          type="submit"
          className="btn btn-lg btn-info btn-block"
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('settings') }
        >
          Configurações
        </button>
      </form>
    </div>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDisabled: PropTypes.func.isRequired,
};
