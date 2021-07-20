import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.handleAssertions = this.handleAssertions.bind(this);
    // this.handleQuestion = this.handleQuestion.bind(this);
  }

  handleAssertions() {
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { assertions } = notRedux.player;
    const initialCount = 3;
    if (assertions < initialCount && assertions >= 0) {
      return 'Podia ser melhor...';
    }
    if (assertions > initialCount || assertions === initialCount) {
      return 'Mandou bem!';
    }
  }

  // handleQuestion() {
  //   const notRedux = JSON.parse(localStorage.getItem('state'));
  //   const { assertions } = notRedux.player;
  //   const number = 4;
  //   if (assertions === 0) {
  //     return 'Não acertou nenhuma pergunta';
  //   } if (assertions > 0 || assertions <= 2) {
  //     return `Acertou ${assertions} perguntas`;
  //   } if (assertions > 2 || assertions <= number) {
  //     return `Acertou ${assertions} perguntas`;
  //   }
  // }

  render() {
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = notRedux.player;
    return (
      <div>
        <Header />
        <div>
          <h2 data-testid="feedback-text">{ this.handleAssertions() }</h2>
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <h3>
            Você acertou
            <span data-testid="feedback-total-question">
              {assertions}
            </span>
            questions
          </h3>
        </div>
        <div>
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar Novamente
            </button>
          </Link>
        </div>
        <div>
          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              type="button"
            >
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({
});

// Feedback.propTypes = {
// }.isRequired;

export default connect(mapStateToProps, null)(Feedback);
