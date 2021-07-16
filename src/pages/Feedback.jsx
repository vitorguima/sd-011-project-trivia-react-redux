import React, { Component } from 'react';
import HeaderGame from '../components/HeaderGame';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <HeaderGame />
        <h1 data-testid="feedback-text">Feedback</h1>
      </div>
    );
  }
}
