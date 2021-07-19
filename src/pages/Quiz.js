import React, { Component } from 'react';
import Header from '../components/Header';
import Game from '../components/Game';
import './Quiz.css';

class Quiz extends Component {
  render() {
    return (
      <div className="quizContainer">
        <Header />
        <Game />
      </div>
    );
  }
}

export default Quiz;
