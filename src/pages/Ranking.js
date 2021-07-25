import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import back from '../images/back_4.png';
import trophy from '../images/trophy_1.png';
import '../App.css';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.renderRanking = this.renderRanking.bind(this);
  }

  renderRanking() {
    const ranking = JSON.parse(localStorage.ranking);
    const rankingSorted = ranking.sort((a, b) => b.score - a.score);
    return (
      rankingSorted.map((user, index) => (
        <>
          <div className="user-rank-data" key={ index }>
            <span className="ranking-number">{ index + 1 }</span>
            <img src={ user.picture } alt={ user.name } />
            <p
              data-testid={ `player-name-${index}` }
              className="ranking-player-name"
            >
              { user.name }
            </p>
            <p
              data-testid={ `player-score-${index}` }
              className="ranking-score"
            >
              { user.score }
            </p>
          </div>
          <hr />
        </>
      ))
    );
  }

  render() {
    return (
      <div className="page-ranking">
        <div className="header-ranking">
          <img src={ trophy } alt="Ranking" className="ranking-img-trophy" />
          <h2 data-testid="ranking-title" className="title-ranking">Ranking</h2>
        </div>
        <div className="div-users-ranking">
          { this.renderRanking() }
        </div>
        <Link to="/" style={ { textDecoration: 'none' } }>
          <div className="ranking-back-home">
            <img src={ back } alt="Voltar" className="back-img-home" />
            <button
              type="button"
              data-testid="btn-go-home"
              className="btn-neon-blue back-home"
            >
              Voltar ao início
            </button>
          </div>
        </Link>
      </div>
    );
  }
}

export default Ranking;
