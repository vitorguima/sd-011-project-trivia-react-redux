import React, { Component } from 'react';
import Header from '../components/Game/Header';
import Feedback from './Feedback';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Feedback />
      </div>
    );
  }
}

export default Game;
