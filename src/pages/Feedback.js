import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.handleQuestions = this.handleQuestions.bind(this);
  }

  handleQuestions(questions) {
    const average = 3;
    if (questions < average) return 'Podia ser melhor...';
    if (questions >= average) return 'Mandou bem!';
  }

  render() {
    const storage = JSON.parse(localStorage.getItem('state'));
    const { score, questions } = storage.player;

    return (
      <div>
        <Header />
        <div>
          <h3 data-testid="feedback-text">{ this.handleQuestions(questions) }</h3>
          <h4 data-testid="feedback-total-score">{ score }</h4>
          <h4 data-testid="feedback-total-questions">{ questions }</h4>
        </div>
        <Link to="/">
          <button
            data-testid="btn-player-again"
            type="button"
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}
