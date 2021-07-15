import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>
        TESTE
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.home.email,
  players: state.home.name,
});

export default connect(mapStateToProps)(Game);
