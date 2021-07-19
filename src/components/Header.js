import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail, UserName, score, assertions } = this.props;
    const getEmail = md5(userEmail).toString();
    const state = JSON.stringify({
      player: {
        name: UserName,
        assertions,
        score,
        gravatarEmail: userEmail,
      },
    });
    localStorage.setItem('state', state);
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${getEmail}` }
          data-testid="header-profile-picture"
          alt="avatar's search"
        />
        <p data-testid="header-player-name">
          { UserName }
        </p>
        <span data-testid="header-score">0</span>
        { score }
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.gravatarEmail,
  UserName: state.user.name,
  score: state.user.score,
  assertions: state.user.assertions,
});

Header.propTypes = {
  UserName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
