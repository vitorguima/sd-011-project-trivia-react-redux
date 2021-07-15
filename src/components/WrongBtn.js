import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WrongBtn extends Component {
  render() {
    const { answer, i } = this.props;
    return (
      <button
        type="button"
        data-testid={ `wrong-answer-${i}` }
      >
        {answer}
      </button>
    );
  }
}

WrongBtn.propTypes = {
  answer: PropTypes.string,
}.isRequired;

export default WrongBtn;
