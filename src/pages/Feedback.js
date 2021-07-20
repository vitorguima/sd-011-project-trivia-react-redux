import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { resetPlayerInfo } from '../actions/game';

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
      return 'Could be better...';
    }
    return 'Well done!';
  }

  render() {
    const { totalScore, resetPlayer } = this.props;
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
            Players Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ resetPlayer }
          >
            Play again!
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalScore: state.game.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetPlayer: () => dispatch(resetPlayerInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  totalScore: PropTypes.number.isRequired,
  resetPlayer: PropTypes.func.isRequired,
};
