import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ButtonToRoutes extends Component {
  render() {
    const { testid, path, textValue } = this.props;
    return (
      <Link to={ path }>
        <button
          type="button"
          data-testid={ testid }
        >
          { textValue }
        </button>
      </Link>
    );
  }
}

ButtonToRoutes.propTypes = {
  path: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  textValue: PropTypes.string.isRequired,
};

export default ButtonToRoutes;
