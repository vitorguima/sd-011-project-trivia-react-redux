import React, { Component } from 'react';
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
    return (
      <div>
        <p data-testid="feedback-text">{mensagem}</p>
        <Header />
      </div>
    );
  }
}
