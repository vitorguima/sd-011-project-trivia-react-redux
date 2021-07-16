import React, { Component } from 'react';
import Header from './Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Testando</p>
      </div>
    );
  }
}

export default Feedback;
