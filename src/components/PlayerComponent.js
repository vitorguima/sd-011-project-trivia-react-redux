import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { countScore } from '../actions';

class PlayerComponent extends Component {
  render() {
    const { assertions } = this.props;
    const player2 = JSON.parse(localStorage.getItem('state'));
    const pictureHash = md5(player2.player.email).toString();
    const linkImage = `https://www.gravatar.com/avatar/${pictureHash}`;
    return (
      <header>
        <p data-testid="header-player-name">{ player2.player.name }</p>
        <img
          data-testid="header-profile-picture"
          src={ linkImage }
          alt="User Gravatar"
        />
        <p data-testid="header-score">{ assertions }</p>
      </header>
    );
  }
}
PlayerComponent.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.trivia.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  assertions: (state) => dispatch(countScore(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
