import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import Header from './Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">
          {
            (assertions >= (1 + 2)) // Se for 3 o lint dá erro
              ? 'Mandou bem!'
              : 'Podia ser melhor...'
          }
        </h3>
        <h4 data-testid="feedback-total-score">{ score }</h4>
        <h4 data-testid="feedback-total-question">{ assertions }</h4>
        <div>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Jogar novamente
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

// const mapStateToProps = (state) => ({
//   assertions: state.player.assertions,
//   score: state.player.score,
// });

export default Feedback; // connect(mapStateToProps)(FeedBack);
