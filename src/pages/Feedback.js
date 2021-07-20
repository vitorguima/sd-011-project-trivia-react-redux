import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  renderFeedbackMessage() {
    const { score } = this.props;
    console.log(score);
    const number = 3;
    if (score < number) {
      return (
        <h3 data-testid="feedback-text">Podia ser melhor...</h3>
      );
    } return <h3 data-testid="feedback-text">Mandou bem!</h3>;
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
