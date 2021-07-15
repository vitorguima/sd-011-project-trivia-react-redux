import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';

class Trivia extends React.Component {

  render() {

    return (
      <header>
        <img data-testid="header-profile-picture" alt="profile picture"/>

        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}

export default connect()(Trivia);
