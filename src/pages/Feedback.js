import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  constructor() {
    super();
    this.feedbackAssertions.bind(this);
  }

  feedbackAssertions() {
    const { scoreUser } = this.props;
    const startingScore = 3;
    if (scoreUser < startingScore && scoreUser >= 0) {
      return 'Podia ser melhor...';
    }
    if (scoreUser > startingScore || scoreUser === startingScore) {
      return 'Mandou bem!';
    }
  }

  render() {
    const { userName, scoreUser, gravatarImage } = this.props;
    return (
      <div>
        <header>
          <img
            src={ gravatarImage }
            alt="player_image"
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name">{ userName }</h2>
          <h3 data-testid="header-score">{ scoreUser }</h3>
        </header>
        <div>
          <h2 data-testid="feedback-text"></h2>
          <h3 data-testid="feedback-total-score"></h3>
          <h3 data-testid="feedback-total-question"></h3>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/Ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userReducer.name,
  scoreUser: state.questions.score,
  gravatarImage: state.userReducer.img,
});

Feedback.propTypes = ({
  userName: PropTypes.func,
  scoreUser: PropTypes.func,
  gravatarImage: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, null)(Feedback);
