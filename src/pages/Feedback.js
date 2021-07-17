import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  correctQuestions() {
    const state = JSON.parse(localStorage.getItem('state'));
    const corrects = state.player.assertions;
    const minCorrects = 3;
    if (corrects < minCorrects) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{ this.correctQuestions() }</h3>
      </div>
    );
  }
}
