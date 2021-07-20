import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { resetPlayerInfo } from '../actions/game';
import './Feedback.css';

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
    const { resetPlayer, totalScore } = this.props;
    const { localStorage } = this.state;

    return (
      <div>
        <Header />
        <div className="feedback-container">
          <div>
            <p
              data-testid="feedback-total-question"
            >
              { `You scored ${localStorage.player.assertions} out of 5 questions` }
            </p>
            <p
              data-testid="feedback-total-score"
            >
              { `Your final score is ${totalScore}` }
            </p>
          </div>
          <h3 data-testid="feedback-text">{ this.correctQuestions() }</h3>
          <div>
            <Link to="/ranking">
              <button
                type="button"
                data-testid="btn-ranking"
                className="play-again-button"
              >
                Ranking
              </button>
            </Link>
            <Link to="/">
              <button
                type="button"
                data-testid="btn-play-again"
                onClick={ resetPlayer }
                className="ranking-button"
              >
                Play again!
              </button>
            </Link>
          </div>
        </div>
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
