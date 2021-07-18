import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();

    this.renderLoginPage = this.renderLoginPage.bind(this);
  }

  renderLoginPage() {
    const { history } = this.props;

    history.push('/');
  }

  render() {
    return (
      <div>
        <div data-testid="feedback-text">
          Tela de Feedback
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.renderLoginPage }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.objectOf(PropTypes.string),
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
