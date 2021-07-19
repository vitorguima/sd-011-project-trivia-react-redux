import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';

const THREE = 3;
class Feedback extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = state.player;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Testando</p>
        <h3 data-testid="feedback-text">
          {
            (assertions >= (THREE))
              ? 'Mandou bem!'
              : 'Podia ser melhor...'
          }
        </h3>
        <h2 data-testid="feedback-total-score">{ score }</h2>
        <h2 data-testid="feedback-total-question">
          { assertions }
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
