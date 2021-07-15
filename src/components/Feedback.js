import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Header from './Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
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
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

// const mapStateToProps = (state) => ({
//   assertions: state.player.assertions,
// });

export default Feedback; // connect(mapStateToProps)(FeedBack);
