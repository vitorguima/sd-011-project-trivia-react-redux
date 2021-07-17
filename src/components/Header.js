import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userName, imageURL, userScore, score } = this.props;
    return (
      <header>
        <img src={ imageURL } alt="user" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ `Jogador: ${userName}` }</p>
        <p data-testid="header-score">{ `Pontuação: ${score}` }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.login.user,
  imageURL: state.game.gravatarImage,
  userScore: state.game.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
};
