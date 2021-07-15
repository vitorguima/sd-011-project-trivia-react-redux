import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateLogin } from '../actions';
import questionAPI from '../services';

class PlayButton extends Component {
  render() {
    const { disabled, gravatarEmail, name, validateNewLogin } = this.props;
    return (
      <Link to="/jogar">
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ () => questionAPI() && validateNewLogin(gravatarEmail, name) }
        >
          Jogar
        </button>
      </Link>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  validateNewLogin: (gravatarEmail, name) => dispatch(validateLogin(gravatarEmail, name)),
});

export default connect(null, mapDispatchToProps)(PlayButton);

PlayButton.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  validateNewLogin: PropTypes.func.isRequired,
};
