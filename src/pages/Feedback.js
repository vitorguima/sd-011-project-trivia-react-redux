import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionScore } from '../actions';

class Feedback extends Component {
  constructor() {
    super();

    this.renderLoginPage = this.renderLoginPage.bind(this);
    this.renderRankingPage = this.renderRankingPage.bind(this);

    this.state = {
      score: 0,
    };
  }

  renderLoginPage() {
    const { history, addingScore } = this.props;
    const { score } = this.state;

    history.push('/');
    addingScore(score);
  }

  renderRankingPage() {
    const { history, addingScore } = this.props;
    const { score } = this.state;

    history.push('/ranking');
    addingScore(score);
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

const mapDispatchToProps = (dispatch) => ({
  addingScore: (score) => dispatch(actionScore(score)),
});

export default connect(null, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.objectOf(PropTypes.string),
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
