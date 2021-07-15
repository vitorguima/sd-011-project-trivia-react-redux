import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      nQuestion: 0,
    };
  }

  render() {
    // const { gameData: { results }, isLoading } = this.props;
    // const { nQuestion } = this.state;
    return (
      <div>
        Olá
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameData: state.gameReducer.gameData,
  isLoading: state.gameReducer.isLoading,
});

GamePage.propTypes = {
  gameData: PropTypes.object,
  isLoading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, null)(GamePage);
