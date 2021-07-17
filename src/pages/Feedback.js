import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      mensagem: '',
    };
  }

  componentDidMount() {
    this.verifyAnswers();
  }

  verifyAnswers() {
    const getKey = localStorage.getItem('state');
    const state = JSON.parse(getKey);
    console.log(state.player.assertions);
    if (state.player.assertions < (1 + 2)) {
      this.setState({
        mensagem: 'Podia ser melhor...',
      });
    } else {
      this.setState({
        mensagem: 'Mandou bem!',
      });
    }
  }

  render() {
    const { mensagem } = this.state;
    const getKey = localStorage.getItem('state');
    const state = JSON.parse(getKey);
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{mensagem}</p>
        <p data-testid="feedback-total-question">{state.player.assertions}</p>
        <p data-testid="feedback-total-score">{state.player.score}</p>
        <Link exact to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}
