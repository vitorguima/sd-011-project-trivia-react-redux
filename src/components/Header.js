import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userName, imageURL, userScore } = this.props;
    let state = localStorage.getItem('state');
    if (!state) {
      state = {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
        },
      };
      localStorage.setItem('state', JSON.stringify(state));
    }
    return (
      <header>
        <img src={ imageURL } alt="user" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ `Jogador: ${userName}` }</p>
        <p data-testid="header-score">{ `Pontuação: ${userScore}` }</p>
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
