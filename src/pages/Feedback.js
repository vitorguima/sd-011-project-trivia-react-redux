import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.msg = this.msg.bind(this);
  }

  msg() {
    const three = 3;
    const { assertions } = this.props; // quantidade de acertos que vem do estado do redux
    const message = assertions < three ? 'Podia ser melhor...' : 'Mandou bem!';
    return message;
  }

  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{ this.msg }</h2>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default Feedback;
