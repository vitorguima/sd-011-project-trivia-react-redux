import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/general/Loading';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getRankingStorage();
  }

  getRankingStorage() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const playersParse = localStorage.getItem('ranking');
    const playersStorage = JSON.parse(playersParse);
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {playersStorage.sort((a, b) => a.score - b.score).reverse()
          .map((player, index) => (
            <div key={ index }>
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <img
                data-testid={ `player-picture-${index}` }
                src={ player.picture }
                alt="Imagem do avatar"
              />
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>))}
        <Link to="/">
          <button
            className="feedback-buttons"
            type="button"
            data-testid="btn-go-home"
          >
            Voltar ao inicio
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
