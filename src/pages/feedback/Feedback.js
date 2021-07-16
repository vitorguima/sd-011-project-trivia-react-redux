import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalScore: JSON.parse(localStorage.getItem('state')).player.score,
    };
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  renderFeedback() {
    const worstScore = 3;
    const TEN = 10;
    // 10 + (timer * dificuldade)
    const { totalScore } = this.state;
    const sumPoints = totalScore * TEN;
    if (totalScore < worstScore) {
      return (
        <div>
          <p data-testid="feedback-text">Podia ser melhor...</p>
          <p
            data-testid="feedback-total-question"
          >
            {`Você acertou ${totalScore} questões!`}
          </p>
          <p
            data-testid="feedback-total-score"
          >
            {`Um total de ${sumPoints} pontos!`}
          </p>
        </div>
      );
    }
    return (
      <div>
        <p data-testid="feedback-text">Mandou bem!</p>
        <p
          data-testid="feedback-total-question"
        >
          {`Você acertou ${totalScore} questões!`}
        </p>
        <p
          data-testid="feedback-total-score"
        >
          {`Um total de ${sumPoints} pontos!`}
        </p>
      </div>

    );
  }

  render() {
    return (
      <>
        <Header />
        { this.renderFeedback() }
        <Link to="ranking">
          <button type="button" data-testid="btn-ranking">
            VER RANKING
          </button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar Novamente
          </button>
        </Link>
      </>
    );
  }
}

export default Feedback;
