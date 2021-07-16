import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.msg = this.msg.bind(this);
  }

  msg() {
    const three = 3;
    const { assertions } = this.props; // quantidade de acertos que vem do estado do redux
    const message = assertions < three ? 'Podia ser melhor...' : 'Mandou bem!';
    return message;
  }

  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{ this.msg }</h2>
        <h3 data-testid="feedback-total-score">Total de score</h3>
        <h3 data-testid="feedback-total-question">Total de acertos</h3>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default Feedback;
