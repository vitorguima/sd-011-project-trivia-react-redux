import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userName, imageURL } = this.props;
    return (
      <header>
        <img src={ imageURL } alt="user" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.login.user,
  imageURL: state.game.gravatarImage,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
};
