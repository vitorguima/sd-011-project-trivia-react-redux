import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaCogs } from 'react-icons/fa';

export default class ButtonsLogin extends Component {
  render() {
    const { validation, handleButton, handleSettings } = this.props;
    return (
      <>
        <button
          id="button-login"
          data-testid="btn-play"
          type="button"
          disabled={ validation() }
          onClick={ () => handleButton() }
        >
          Jogar
        </button>
        <button
          className="settings-btn"
          type="button"
          data-testid="btn-settings"
          onClick={ () => handleSettings() }
        >
          <FaCogs />
        </button>
      </>
    );
  }
}

ButtonsLogin.propTypes = {
  validation: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
  handleSettings: PropTypes.func.isRequired,
}.isRequired;
