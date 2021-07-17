import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <p data-testid="feedback-text">Página de feedback</p>
        <Header />
      </div>
    );
  }
}
