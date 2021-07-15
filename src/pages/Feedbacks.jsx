import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedbacks extends Component {
  constructor() {
    super();
    this.state = {
      score: JSON.parse(localStorage.state).player.score,
      name: JSON.parse(localStorage.state).player.name,
    };
  }

  render() {
    const { score, name } = this.state;
    return (
      <div>
        <p data-testid="feedback-text">Feedback</p>
        <Header
          score={ score }
          name={ name }
        />
      </div>
    );
  }
}
