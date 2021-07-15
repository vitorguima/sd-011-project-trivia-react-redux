import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const player = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header score={ player.player.score } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
