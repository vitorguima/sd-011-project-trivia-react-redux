import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import '../style/index.css';

class Header extends Component {
  render() {
    const hash = md5(localStorage.token).toString();
    const userImage = `https://www.gravatar.com/avatar/${hash}`;
    const { name, score } = this.props;
    return (
      <header className="container-header">
        <img
          alt="User Avatar"
          src={ userImage }
          data-testid="header-profile-picture"
        />
        <span
          className="name"
          data-testid="header-player-name"
        >
          { name }
        </span>
        <span
          className="score"
          data-testid="header-score"
        >
          { score }
        </span>
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};
