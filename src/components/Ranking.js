import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

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
      <div key={ index }>
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
        <img
          alt="gravatar"
          src={ `https://www.gravatar.com/avatar/${hash}` }
        />
      </div>
    );
  }

  render() {
    const { ranking } = this.state;
    const orderedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          orderedRanking.map((user, index) => this.renderRankingCard(user, index))
        }
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Voltar ao início
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
