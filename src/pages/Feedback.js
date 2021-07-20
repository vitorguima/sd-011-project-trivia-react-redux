import React from 'react';
import { connect } from 'react-redux';
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
    const { assertions, message } = this.state;
    return (
      <div>
        <PlayerComponent assertions={ assertions } />
        <section>
          <p data-testid="feedback-text">{message}</p>
          <p data-testid="feedback-total-score">{assertions}</p>
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

Feedback.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      assertions: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect()(Feedback);
