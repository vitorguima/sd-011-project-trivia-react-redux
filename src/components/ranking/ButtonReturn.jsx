import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonReturn extends Component {
  render() {
    return (
      <div className="ranking-button">
        <Link to="/">
          <button
            className="feedback-buttons"
            type="button"
            data-testid="btn-go-home"
          >
            Voltar ao inicio
          </button>
        </Link>
      </div>
    );
  }
}

export default ButtonReturn;
