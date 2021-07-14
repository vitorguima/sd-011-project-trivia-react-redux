import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>
        <h1>Game Page</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
