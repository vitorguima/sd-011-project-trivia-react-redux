import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerComponent from '../components/PlayerComponent';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
      message: '',
    };
    this.handleScore = this.handleScore.bind(this);
  }

  componentDidMount() {
    this.handleScore();
  }

  handleScore() {
    const { location: { state: { assertions } } } = this.props;
    const THREE_POINTS = 3;

    if (assertions < THREE_POINTS) {
      this.setState(() => ({
        assertions,
        message: 'Podia ser melhor...',
      }));
    } else {
      this.setState(() => ({
        assertions,
        message: 'Mandou bem!',
      }));
    }
  }

  render() {
    const { message } = this.state;
    const score = JSON.parse(localStorage.getItem('state'));

    return (
      <div className="player">
        <header>
          <PlayerComponent data-testid="header-score" />
        </header>
        <section>
          <p data-testid="feedback-text">{message}</p>
          <p data-testid="feedback-total-score">{score.player.score}</p>
          <p data-testid="feedback-total-question">0</p>
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

Feedback.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      assertions: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Feedback;
