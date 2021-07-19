import React from 'react';
import PropTypes from 'prop-types';
import QuestionCard from '../components/QuestionCard';
import PlayerHeader from '../components/PlayerHeader';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <PlayerHeader />
        <QuestionCard history={ history } />
      </div>
    );
  }
}

export default Game;

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
