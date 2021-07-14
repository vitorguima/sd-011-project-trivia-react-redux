import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayerComponent from '../components/PlayerComponent';
import GameComponent from '../components/GameComponent';
import { fetchTrivia } from '../actions';

class screenGame extends Component {
  componentDidMount() {
    const { searchQuestion } = this.props;
    const recoveredToken = JSON.parse(localStorage.getItem('token')).token;
    searchQuestion(recoveredToken);
  }

  render() {
    return (
      <div>
        <PlayerComponent />
        <GameComponent />
      </div>
    );
  }
}

screenGame.propTypes = {
  searchQuestion: PropTypes.func,
};

screenGame.defaultProps = {
  searchQuestion: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  searchQuestion: (token) => dispatch(fetchTrivia(token)),
});

export default connect(null, mapDispatchToProps)(screenGame);
