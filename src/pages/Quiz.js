import React, { Component } from 'react';
import Header from '../components/Header';
import Game from '../components/Game';

class Quiz extends Component {
  render() {
    return (
      <div>
        <Header />
        <Game />
      </div>
    );
  }
}

export default Quiz;
