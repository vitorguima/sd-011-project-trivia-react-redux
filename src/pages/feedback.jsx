import React, { Component } from 'react';
import Header from './header';

export default class feedback extends Component {
  render() {
    return (
      <div>
        <h1>Feedback</h1>
        <Header />
        <p data-testid="feedback-text" />
      </div>
    );
  }
}
