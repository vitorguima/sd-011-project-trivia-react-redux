import React, { Component } from 'react';
import Header from '../../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalScore: JSON.parse(localStorage.getItem('state')).player.score,
    };
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  renderFeedback() {
    const worstScore = 3;
    const { totalScore } = this.state;
    if (totalScore < worstScore) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      );
    }
    return (
      <p data-testid="feedback-text">Mandou bem!</p>
    );
  }

  render() {
    return (
      <>
        <Header />
        { this.renderFeedback() }
      </>
    );
  }
}

export default Feedback;
