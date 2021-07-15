import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { playerInfo, loginInfo } = this.props;

    return (
      <div>
        <p
          data-testid="header-score"
        >
          { playerInfo.score }
        </p>
        <p
          data-testid="header-player-name"
        >
          { loginInfo.name }
        </p>
        <img
          data-testid="header-profile-picture"
          src={ playerInfo.picture }
          alt="Imagem"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerInfo: state.playerReducer,
  loginInfo: state.login,
});

Header.propTypes = {
  playerInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  loginInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
