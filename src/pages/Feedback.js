import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Feedback.css';

class Feedback extends Component {
  render() {
    const { storedAssertions, totalScore } = this.props;
    console.log(storedAssertions);
    const MINIMUM_ASSERTS = 3;
    const MESSAGE = storedAssertions < MINIMUM_ASSERTS
      ? 'Podia ser melhor...'
      : 'Mandou bem!';
    // const QUANTITY_ASSERTIONS = storedAssertions === 0
    //   ? 'Não acertou nenhuma pergunta'
    //   : `Acertou ${storedAssertions} perguntas`;

    return (
      <div
        data-testid="feedback-text"
      >
        <Header />
        <div className="feedbackContainer">
          <p
            data-testid="feedback-text"
            className="feedbackMessage"
          >
            {
              MESSAGE
            }
          </p>
          <p
            data-testid="feedback-total-score"
            className="feedbackScore"
          >
            Pontuação: &nbsp;
            <span>
              55
              {
                totalScore
              }
            </span>
          </p>
          <p
            data-testid="feedback-total-question"
            className="feedbackAsserions"
          >
            Você acertou: &nbsp;
            <span>
              { Number(0) }
            </span>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storedAssertions: state.playerReducer.assertions,
  totalScore: state.playerReducer.score,
});

Feedback.propTypes = {
  storedAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
