import React, { Component } from 'react';
import Questions from '../../components/Questions';

class GamePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default GamePage;
