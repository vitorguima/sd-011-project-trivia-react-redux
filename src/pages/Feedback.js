import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.handleAssertions = this.handleAssertions.bind(this);
  }

  componentDidMount() {
    this.sendRankingToLocalStorage();
  }

  handleAssertions() {
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { assertions } = notRedux.player;
    const initialCount = 3;
    if (assertions < initialCount && assertions >= 0) {
      return 'Podia ser melhor...';
    }
    if (assertions >= initialCount) {
      return 'Mandou bem!';
    }
  }

  sendRankingToLocalStorage() {
    const notRedux = JSON.parse(localStorage.getItem('state'));
    console.log(notRedux);
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) {
      const rankingStorage = [{
        name: notRedux.player.name,
        score: notRedux.player.score,
        picture: notRedux.player.gravatarEmail,
      }];
      localStorage.setItem('ranking', JSON.stringify(rankingStorage));
    } else {
      ranking.push({
        name: notRedux.player.name,
        score: notRedux.player.score,
        picture: notRedux.player.gravatarEmail,
      });
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  render() {
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = notRedux.player;
    return (
      <div>
        <Header />
        <div>
          <h2 data-testid="feedback-text">{ this.handleAssertions(assertions) }</h2>
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <h3 data-testid="feedback-total-question">
            { assertions }
          </h3>
        </div>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
