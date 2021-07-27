import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PlayerComponent extends Component {
  render() {
    const player2 = JSON.parse(localStorage.getItem('state'));
    const score = JSON.parse(localStorage.getItem('state'));
    const pictureHash = md5(player2.player.email).toString();
    const linkImage = `https://www.gravatar.com/avatar/${pictureHash}`;
    const { questions } = this.props;
    return (
      <header>
        <p data-testid="header-player-name">{ player2.player.name }</p>
        <img
          data-testid="header-profile-picture"
          src={ linkImage }
          alt="User Gravatar"
        />
        <p data-testid="header-score">{score.player.score}</p>
      </header>
    );
  }
}

PlayerComponent.propTypes = {
  assertions: PropTypes.number,
};

PlayerComponent.defaultProps = {
  assertions: 0,
};

const mapStateToProps = (state) => ({
  questions: state.trivia.assertions,
});

export default connect(mapStateToProps)(PlayerComponent);
