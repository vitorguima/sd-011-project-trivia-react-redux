import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, onClick }) => {
  return (
    <button
      type="button"
      className={ className }
      onClick={ onClick }
    >
      { children }
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
}