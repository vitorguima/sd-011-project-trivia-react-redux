import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import './feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalScore: props.totalScore,
      totalAssertions: props.totalAssertions,
    };
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  renderFeedback() {
    const worstScore = 3;
    const { totalScore, totalAssertions } = this.state;
    if (totalAssertions < worstScore) {
      return (
        <div>
          <p data-testid="feedback-text">Podia ser melhor...</p>
          <p
            data-testid="feedback-total-question"
          >
            {totalAssertions > 1
              ? `Você acertou ${totalAssertions} perguntas}`
              : `Você acertou ${totalAssertions} pergunta`}

          </p>
          <p
            data-testid="feedback-total-score"
          >
            {`Sua pontuação é de: ${totalScore} pontos`}

          </p>
        </div>
      );
    }
    return (
      <div>
        <p data-testid="feedback-text">Mandou bem!</p>
        <p
          data-testid="feedback-total-question"
        >
          {`Você acertou ${totalAssertions} perguntas`}

        </p>
        <p
          data-testid="feedback-total-score"
        >
          {`Sua pontuação é de: ${totalScore} pontos`}

        </p>
      </div>

    );
  }

  render() {
    return (
      <>
        <Header />
        { this.renderFeedback() }
        <div className="feedback-button">
          <Link to="ranking">
            <button className="btn-ranking" type="button" data-testid="btn-ranking">
              VER RANKING
            </button>
          </Link>
          <Link to="/">
            <button className="btn-play-again" type="button" data-testid="btn-play-again">
              JOGAR NOVAMENTE
            </button>
          </Link>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  totalScore: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  totalScore: state.ScoreReducer.totalScore,
  totalAssertions: state.ScoreReducer.totalAssertions,
});

export default connect(mapStateToProps)(Feedback);
