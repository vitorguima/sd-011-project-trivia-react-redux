import React from 'react';
import { Link } from 'react-router-dom';

class Scorebboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="feedback-scoreboard">
        <h2>
          Você acertou:
          <span data-testid="feedback-total-score"> 0 </span>
          de 5 perguntas.
        </h2>
        <h2>
          Você fez:
          <span data-testid="feedback-total-question"> 0 </span>
          pontos.
        </h2>

        <div className="feedback-scoreboard-button">
          <Link to="/">
            <button
              className="feedback-buttons"
              type="button"
              data-testid="btn-play-again"
            >
              Jogar Novamente
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Scorebboard;
