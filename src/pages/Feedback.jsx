import React from 'react';
import PlayerHeader from '../components/PlayerHeader';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <PlayerHeader />
        <h1 data-testid="feedback-text"> Página de Feedback </h1>
      </div>
    );
  }
}

export default Feedback;
