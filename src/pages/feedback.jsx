import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';

export default class feedback extends Component {
  render() {
    return (
      <div>
        <h1>Feedback</h1>
        <Header />
        <p data-testid="feedback-text" />
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar Novamente</button>
        </Link>
      </div>
    );
  }
}
