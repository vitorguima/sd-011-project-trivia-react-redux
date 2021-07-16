import React, { Component } from 'react';

class ResetButton extends Component {
  render() {
    const { resetBtn } = this.props;
    return (
      <button
        onClick={ () => resetBtn() }
        data-testid="btn-next"
        type="button"
      >
        Próxima
      </button>
    );
  }
}

export default ResetButton;
