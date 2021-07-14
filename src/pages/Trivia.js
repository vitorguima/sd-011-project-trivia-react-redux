import React from 'react';
import { connect } from 'react-redux';

class Trivia extends React.Component {
  render() {
    return (
      <p>Página do Jogo</p>
    );
  }
}

export default connect()(Trivia);
