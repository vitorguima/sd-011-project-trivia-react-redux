import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { avatar, name } = this.props;
    const { score } = this.props;
    return (
      <div>
        <img
          className="avatar"
          data-testid="header-profile-picture"
          src={ avatar }
          alt="Avatar"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  avatar: state.login.img,
  name: state.login.name,
  score: state.game.score,
});

Header.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(MapStateToProps)(Header);
