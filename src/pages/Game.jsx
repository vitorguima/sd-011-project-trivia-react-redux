import React from 'react';
import QuestionCard from '../components/QuestionCard';
import PlayerHeader from '../components/PlayerHeader';

class Game extends React.Component {
  render() {
    return (
      <div>
        <PlayerHeader />
        <QuestionCard />
      </div>
    );
  }
}

export default Game;
