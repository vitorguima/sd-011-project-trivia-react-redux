import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();

    this.renderLoginPage = this.renderLoginPage.bind(this);
    this.renderRankingPage = this.renderRankingPage.bind(this);
  }

  renderLoginPage() {
    const { history } = this.props;

    history.push('/');
  }

  renderRankingPage() {
    const { history } = this.props;

    history.push('/ranking');
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
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.renderRankingPage }
        >
          Ver Ranking
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
