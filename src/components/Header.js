import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';
// import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { playerInfo, loginInfo } = this.props;
    return (
      <header className="headerContainer">
        <p className="pontuation">
          Pontuação:&nbsp;
          <span
            className="pontuation"
            data-testid="header-score"
          >
            { Number(playerInfo.score) }
          </span>
        </p>
        <p
          className="playerName"
          data-testid="header-player-name"
        >
          { loginInfo.name }
        </p>
        <img
          data-testid="header-profile-picture"
          src={ playerInfo.picture }
          alt="Imagem"
        />
      </header>
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
