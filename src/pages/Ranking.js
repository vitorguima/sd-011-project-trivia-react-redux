import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
        <h1 data-testid="ranking-title">
          Ranking de jogadores
        </h1>
        { ranking.map((player, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>
              { player.name }
            </p>
            <p data-testid={ `player-score-${index}` }>
              { player.score }
            </p>
            <img src={ player.picture } alt={ `${player.name} gravatar` } />
          </div>
        ))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar para o início
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  imageURL: state.game.gravatarImage,
});

export default connect(mapStateToProps)(Ranking);
