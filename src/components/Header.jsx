import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const hash = md5(localStorage.token).toString();
    const userImage = `https://www.gravatar.com/avatar/${hash}`;
    const { name } = this.props;
    return (
      <header>
        <img
          alt="User Avatar"
          src={ userImage }
          data-testid="header-profile-picture"
        />
        <span
          data-testid="header-player-name"
        >
          { name }
        </span>
        <span
          data-testid="header-score"
        >
          0
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
};
