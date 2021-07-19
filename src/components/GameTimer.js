import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameTimer extends Component {
  render() {
    const { answerClicked } = this.props;
    if (answerClicked) {
      return null;
    }
    return (
      <div>Eu sou um Timer</div>
    );
  }
}

const mapStateToProps = (state) => ({
  answerClicked: state.gameReducer.answerClicked,
});

GameTimer.propTypes = {
  answerClicked: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(GameTimer);
