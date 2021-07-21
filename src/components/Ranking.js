import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

import '../styles/Ranking.css';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    };
    this.getStorageInfo = this.getStorageInfo.bind(this);
  }

  componentDidMount() {
    this.getStorageInfo();
  }

  getStorageInfo() {
    if (localStorage.getItem('ranking')) {
      const data = localStorage.getItem('ranking');
      const ranking = JSON.parse(data);
      this.setState({ ranking });
    }
  }

  renderRankingCard({ name, email, score }, index) {
    const hash = md5(email);
    return (
      <div key={ index } className="ranking-card">
        <img
          alt="gravatar"
          src={ `https://www.gravatar.com/avatar/${hash}` }
        />
        <div>
          <span>Jogador: </span>
          <span data-testid={ `player-name-${index}` }>{name}</span>
        </div>
        <div>
          <span>Pontuação: </span>
          <span data-testid={ `player-score-${index}` }>{score}</span>
        </div>
      </div>
    );
  }

  render() {
    const { ranking } = this.state;
    const maxPlayer = 9;
    const orderedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div className="ranking-page">
        <Link to="/" data-testid="btn-go-home" className="btn-go-home">
          Voltar ao início
        </Link>
        <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
        {
          orderedRanking.map((user, index) => {
            if (index === maxPlayer) {
              return this.renderRankingCard(user, index);
            }
            return null;
          })
        }
      </div>
    );
  }
}

export default Ranking;
