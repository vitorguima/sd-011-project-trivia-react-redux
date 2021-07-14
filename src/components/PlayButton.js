import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { questionAPI, validateLogin } from '../actions';

class PlayButton extends Component {
  render() {
    const { disabled, email, playerName, validateNewLogin } = this.props;
    return (
      <Link to="/jogar">
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ () => questionAPI() && validateNewLogin(email, playerName) }
        >
          Jogar
        </button>
      </Link>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  validateNewLogin: (email, password) => dispatch(validateLogin(email, password)),
});

export default connect(null, mapDispatchToProps)(PlayButton);

PlayButton.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  validateNewLogin: PropTypes.func.isRequired,
};
