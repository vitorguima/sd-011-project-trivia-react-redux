import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: JSON.parse(localStorage.getItem('ranking')),
    };
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <header data-testid="ranking-title">
          Ranking
        </header>
        <span className="players-ranking">
          { ranking.map((player, index) => (
            <div className="player-container" key={ index }>
              <img
                className="gravatar-image"
                src={ player.picture }
                alt={ `${player.name} gravatar` }
              />
              <p data-testid={ `player-name-${index}` }>
                { `Player: ${player.name}` }
              </p>
              <p data-testid={ `player-score-${index}` }>
                { `Score: ${player.score}` }
              </p>
            </div>
          ))}
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
              className="play-again-button"
            >
              Play Again!
            </button>
          </Link>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  imageURL: state.game.gravatarImage,
});

export default connect(mapStateToProps)(Ranking);
