import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PlayerComponent from '../components/PlayerComponent';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      message: '',
    };
    this.handleScore = this.handleScore.bind(this);
  }

  componentDidMount() {
    this.handleScore();
  }

  handleScore() {
    const { score } = this.state;
    const THREE_POINTS = 3;

    if (score < THREE_POINTS) {
      this.setState((oldState) => ({
        ...oldState,
        message: 'Podia ser melhor...',
      }));
    } else {
      this.setState((oldState) => ({
        ...oldState,
        message: 'Mandou bem!',
      }));
    }
  }

  render() {
    const { message, score, assertions } = this.state;
    return (
      <div>
        <PlayerComponent />
        <section>
          <p data-testid="feedback-text">{message}</p>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Jogar novamente</button>
          </Link>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">Ver Ranking</button>
          </Link>
        </section>
      </div>
    );
  }
}

export default connect()(Feedback);
