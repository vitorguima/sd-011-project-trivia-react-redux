import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.handleQuestions = this.handleQuestions.bind(this);
  }

  handleQuestions(assertions) {
    const average = 3;
    if (assertions < average) return 'Podia ser melhor...';
    if (assertions >= average) return 'Mandou bem!';
  }

  render() {
    const storage = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = storage.player;

    return (
      <div>
        <Header />
        <div>
          <h3 data-testid="feedback-text">{ this.handleQuestions(assertions) }</h3>
          <h4 data-testid="feedback-total-score">{ score }</h4>
          <h4 data-testid="feedback-total-question">{ assertions }</h4>
        </div>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}
