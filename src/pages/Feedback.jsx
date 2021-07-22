import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';
import './Feedback.css';

class Feedback extends React.Component {
  feedbackMessage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const NUMBER_TREE = 3;
    if (state.player.assertions < NUMBER_TREE) {
      return 'Next time you go better!';
    }
    return 'VERY GOOD!';
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { userName, gravatarImage } = this.props;
    return (
      <>
        <img
          className="all-pages-logo"
          src="assets/logo.png"
          alt="logo trivia"
        />
        <div className="feedback-sides">
          <header className="feedback-header">
            <div className="feedback-user">
              <Avatar />
              <p
                className="feedback-user-name"
                data-testid="header-player-name"
              >
                {userName}
              </p>
            </div>
            <div className="feedback-total-score">
              <p>Points:</p>
              <p className="feedback-score" data-testid="header-score">
                {state.player.score}
              </p>
              <p data-testid="feedback-total-question">{`Assertions: ${state.player.assertions}`}</p>
            </div>
          </header>
        </div>
        <p className="feedback-message" data-testid="feedback-text">
          {this.feedbackMessage()}
        </p>
        <div className="feedback-buttons">
          <Link
            className="feedback-ranking"
            data-testid="btn-ranking"
            to="/ranking"
          >
            Ranking
          </Link>
          <Link to="/">
            <button
              className="feedback-play-again"
              type="button"
              data-testid="btn-play-again"
            >
              Play Again!
            </button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  gravatarImage: state.loginReducer.gravatarImage,
});

Feedback.propTypes = {
  userName: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
