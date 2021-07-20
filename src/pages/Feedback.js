import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.handleAssertions = this.handleAssertions.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
  }

  handleAssertions() {
    const magicNumber = 6;
    const assertions = Math.floor(Math.random() * magicNumber);
    const initialCount = 3;
    if (assertions < initialCount && assertions >= 0) {
      return 'Podia ser melhor...';
    }
    if (assertions > initialCount || assertions === initialCount) {
      return 'Mandou bem!';
    }
  }

  handleQuestion({ target: { name } }) {
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { assertions } = notRedux.user;
    const number = 4;
    if (name === 'correctAnswer') assertions.notRedux += 1;
    localStorage.setItem('state', JSON.stringify(notRedux));
    if (assertions === 0) {
      return 'Não acertou nenhuma pergunta';
    } if (assertions > 0 || assertions <= 2) {
      return `Acertou ${assertions} perguntas`;
    } if (assertions > 2 || assertions <= number) {
      return `Acertou ${assertions} perguntas`;
    }
  }

  render() {
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { score } = notRedux.player;
    localStorage.setItem('state', JSON.stringify(notRedux));
    return (
      <div>
        <Header />
        <div>
          <h2 data-testid="feedback-text">{ this.handleAssertions() }</h2>
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <h3 data-testid="feedback-total-question">{ this.handleQuestion }</h3>
        </div>
        <nav>
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar Novamente
            </button>
          </Link>
          <Link to="/ranking" data-testid="btn-ranking">
            <button
              data-testid="btn-ranking"
              type="button"
            >
              Ver Ranking
            </button>
          </Link>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.triviaReducer.trivia.results,
});

Feedback.propTypes = {
  results: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
