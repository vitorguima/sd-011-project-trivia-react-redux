import React, { Component } from 'react';

import Header from './Header';

class Feedback extends Component {
  render() {
    const tres = 3;
    const data = localStorage.getItem('state');
    const state = JSON.parse(data);
    const { assertions, score } = state.player;
    const goodScore = assertions >= tres;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {goodScore ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
      </div>
    );
  }
}

export default Feedback;
