import React from 'react';
import PropTypes from 'prop-types';

class ButtonNext extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { testid, nextQuestion, btnState } = this.props;
    return (
      <div className="container-button-next">
        <button
          style={ { display: btnState ? 'block' : 'none' } }
          className="button-next"
          data-testid={ testid }
          type="button"
          onClick={ nextQuestion }
        >
          Proximo
        </button>
      </div>
    );
  }
}

ButtonNext.propTypes = {
  testid: PropTypes.string.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  btnState: PropTypes.bool.isRequired,
};

export default ButtonNext;
