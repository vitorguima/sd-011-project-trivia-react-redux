import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ButtonToRoutes from '../components/ButtonToRoutes';

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
      <div data-testid="feedback-text">
        <Header />
        <p data-testid="feedback-text">
          {
            MESSAGE
          }
        </p>
        <p data-testid="feedback-total-score">
          {
            totalScore
          }
        </p>
        <p data-testid="feedback-total-question">
          { Number(0) }
        </p>
        <ButtonToRoutes
          path="/ranking"
          textValue="Ver Ranking"
          testid="btn-ranking"
        />
        <ButtonToRoutes
          path="/"
          textValue="Jogar novamente"
          testid="btn-play-again"
        />
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
