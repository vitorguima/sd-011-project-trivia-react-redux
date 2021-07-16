import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedbacks extends Component {
  constructor() {
    super();
    this.state = {
      score: JSON.parse(localStorage.state).player.score,
      name: JSON.parse(localStorage.state).player.name,
      assertions: JSON.parse(localStorage.state).player.assertions,
    };
  }

  mensage() {
    const tres = 3;
    const { assertions } = this.state;
    if (assertions >= tres) {
      return (
        'Mandou bem!'
      );
    }
    return (
      'Podia ser melhor...'
    );
  }

  render() {
    const { score, name, assertions } = this.state;
    return (
      <div>
        <p data-testid="feedback-text">Feedback</p>
        <Header
          score={ score }
          name={ name }
        />
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-text">{this.mensage()}</p>
      </div>
    );
  }
}
