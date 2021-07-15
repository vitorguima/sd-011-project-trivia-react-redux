import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CorrectBtn extends Component {
  render() {
    const { answer } = this.props;
    return (
      <button
        type="button"
        data-testid="correct-answer"
      >
        {answer}
      </button>
    );
  }
}

CorrectBtn.propTypes = {
  answer: PropTypes.string,
}.isRequired;

export default CorrectBtn;
