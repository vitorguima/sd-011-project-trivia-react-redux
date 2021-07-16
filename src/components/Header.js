import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Header extends Component {
// .
  render() {
    const { profileImg, profileName, profileScore } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${profileImg}` }
          data-testid="header-profile-picture"
          alt="User profile"
        />
        <span
          data-testid="header-player-name"
        >
          { profileName }
        </span>
        <span
          data-testid="header-score"
        >
          { `score: ${profileScore}`}
        </span>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  // profileImg: state.player.gravatarEmail, alterar para src;
  profileName: state.player.name,
  profileScore: state.player.score,
});

// const mapDispatchToProps = {
//   return;
// };

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  profileImg: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  profileScore: PropTypes.string.isRequired,
};
