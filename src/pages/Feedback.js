import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.renderLoginPage = this.renderLoginPage.bind(this);
    this.renderRankingPage = this.renderRankingPage.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
  }

  handleFeedback() {
    const { assertions } = this.props;
    const countAssertions = 3;
    return assertions >= countAssertions ? 'Mandou bem!' : 'Podia ser melhor...';
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
        <Header />
        <h3 data-testid="feedback-text">
          { this.handleFeedback() }
        </h3>
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

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number,
  history: PropTypes.shape({
    location: PropTypes.objectOf(PropTypes.string),
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
