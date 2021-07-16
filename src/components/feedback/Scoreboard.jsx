import React from 'react';
import { Link } from 'react-router-dom';

class Scorebboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Congratulations!</h1>
        <h2>You have completed the quiz.</h2>
        <h2>
          You got:
          <span data-testid="feedback-total-score"> 0 </span>
          of 5 questions right.
        </h2>
        <h2>
          You got:
          <span data-testid="feedback-total-question"> 0 </span>
          points.
        </h2>

        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar Novamente</button>
        </Link>
      </div>
    );
  }
}

export default Scorebboard;
