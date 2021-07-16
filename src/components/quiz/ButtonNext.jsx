import React from 'react';
import PropTypes from 'prop-types';

class ButtonNext extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { testid, nextQuestion } = this.props;
    return (
      <button
        data-testid={ testid }
        type="button"
        onClick={ nextQuestion }
      >
        Proximo
      </button>);
  }
}

ButtonNext.propTypes = {
  testid: PropTypes.string.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default ButtonNext;
