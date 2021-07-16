import React from 'react';
import PropTypes from 'prop-types';

class ButtonQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { wrong, testid } = this.props;
    return (
      <button
        data-testid={ testid }
        type="button"
      >
        { wrong }
      </button>
    );
  }
}

ButtonQuestion.propTypes = {
  wrong: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};

export default ButtonQuestion;
