import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      localStorage: JSON.parse(localStorage.getItem('state')),
    };
  }

  correctQuestions() {
    const { localStorage } = this.state;
    const minCorrects = 3;
    if (localStorage.player.assertions < minCorrects) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { totalScore } = this.props;
    const { localStorage } = this.state;

    return (
      <div>
        <Header />
        <div>
          <p data-testid="feedback-total-score">{ totalScore }</p>
          <p data-testid="feedback-total-question">{ localStorage.player.assertions }</p>
        </div>
        <h3 data-testid="feedback-text">{ this.correctQuestions() }</h3>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ir para o ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalScore: state.game.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  totalScore: PropTypes.number.isRequired,
};
