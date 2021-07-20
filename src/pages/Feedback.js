import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  renderFeedbackMessage() {
    const number = 3;
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    console.log(assertions);
    if (assertions < number) {
      return (
        <h3 data-testid="feedback-text">Podia ser melhor...</h3>
      );
    }
    if (assertions >= number) return <h3 data-testid="feedback-text">Mandou bem!</h3>;
  }

  render() {
    return (
      <div>
        <Header />
        <section>
          { this.renderFeedbackMessage() }
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.user.score,
});

Feedback.propTypes = {
  score: PropTypes.number,
}.isrequired;

export default connect(mapStateToProps)(Feedback);
