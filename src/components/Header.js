import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, playerName, score } = this.props;
    const HASH = md5(email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${HASH}` }
          alt="avatar jogador"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ playerName }</p>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.playerReducer.email,
  playerName: state.playerReducer.playerName,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
};
