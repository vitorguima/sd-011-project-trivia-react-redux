import React, { Component } from 'react';
import Header from '../components/Header';
import { getPlayerLocalStorage } from '../services/LocalStorage';

export default class Feedback extends Component {
  constructor() {
    super();

    this.feedbackmsg = this.feedbackmsg.bind(this);
  }

  componentDidMount() {
    this.feedbackmsg();
  }

  feedbackmsg() {
    const user = getPlayerLocalStorage();
    const { player } = user;
    const three = 3;
    const msg = (player.assertions >= three) ? 'Mandou bem!' : 'Podia ser melhor...';
    return msg;
  }

  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{ this.feedbackmsg() }</h3>
      </div>
    );
  }
}
