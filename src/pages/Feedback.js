import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Login from './Login';

class Feedback extends Component {
  constructor() {
    super();
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
  }

  handleQuestions() {
    const { assertions } = this.props;
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
    if (name === 'correctAnswer') assertions.notRedux += 1;
    localStorage.setItem('state', JSON.stringify(notRedux));
  }

  render() {
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { gravatarHash, name, score } = notRedux.user;
    localStorage.setItem('state', JSON.stringify(notRedux));
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${gravatarHash}` }
            alt="Imagem do seu avatar"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{ name }</h3>
          <h4 data-testid="header-score">{ score }</h4>
        </header>
        <div>
          <h2 data-testid="feedback-text">Mandou bem!</h2>
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <h3 data-testid="feedback-total-question">{ this.handleQuestion }</h3>
        </div>
        <nav>
          <Link to="/" data-testid="btn-play-again">
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente
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
  // assertions: state.userReducer.assertion,
  questions: state.questionsReducer.questions,
});

Feedback.propTypes = {
  questions: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
