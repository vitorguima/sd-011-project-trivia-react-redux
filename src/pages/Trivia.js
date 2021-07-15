import React from 'react';
import { connect } from 'react-redux';

class Trivia extends React.Component {
  render() {
    return (
      <h1>Página do Jogo</h1>
    );
  }
}

export default connect()(Trivia);
