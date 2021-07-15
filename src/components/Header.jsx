import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { avatar, name } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ avatar } alt="Avatar" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  avatar: state.login.img,
  name: state.login.name,
});

Header.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(MapStateToProps)(Header);
