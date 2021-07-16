import React from 'react';
import Header from '../components/feedback/Header';
import Scoreboard from '../components/feedback/Scoreboard';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div>
        <Header />
        <Scoreboard />
      </div>
    );
  }
}

export default Feedback;
