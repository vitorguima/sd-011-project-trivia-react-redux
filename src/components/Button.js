import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateLogin } from '../actions';

class Button extends Component {
  render() {
    const { email, playerName, validateNewLogin, disabled } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-play"
        disabled={ disabled }
        onClick={ () => validateNewLogin(email, playerName) }
      >
        Jogar
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  validateNewLogin: (email, playerName) => dispatch(validateLogin(email, playerName)),
});

export default connect(null, mapDispatchToProps)(Button);

Button.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  validateNewLogin: PropTypes.func.isRequired,
};
