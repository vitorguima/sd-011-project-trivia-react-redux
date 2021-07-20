import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  feedbackMessage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const NUMBER_TREE = 3;
    if (state.player.assertions < NUMBER_TREE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { userName, gravatarImage } = this.props;
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ gravatarImage }
            alt={ `Foto de ${userName}` }
          />
          <p data-testid="header-player-name">{ `Nome do usuário: ${userName}` }</p>
          <p data-testid="header-score">
            { state.player.score}
          </p>
          <p data-testid="feedback-text">{ this.feedbackMessage() }</p>
          <p data-testid="feedback-total-score">{ state.player.score }</p>
          <p data-testid="feedback-total-question">{ state.player.assertions }</p>
        </header>
        <Link data-testid="btn-ranking" to="/ranking">Ver Ranking</Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
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
