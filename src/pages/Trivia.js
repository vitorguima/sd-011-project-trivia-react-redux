import React from 'react';
import { connect } from 'react-redux';

class Trivia extends React.Component {
  render() {
    return (
      <header>
        <img data-testid="header-profile-picture" alt="profile " />
        <h2 data-testid="header-player-name">{ localStorage.getItem('state') }</h2>
        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}

export default connect()(Trivia);
