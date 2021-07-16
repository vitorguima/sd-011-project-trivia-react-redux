import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import '../style/header.css';

class Header extends React.Component {
  render() {
    const { username, avatar, score } = this.props;
    console.log(avatar);
    return (
      <header>
        <div className="header-container">
          <div className="header-user-container">
            <img
              className="header-avatar"
              src={ avatar }
              alt="avatar"
              data-testid="header-profile-picture"
            />
            <h3 data-testid="header-player-name">
              Jogador(a):
              <span>{ username }</span>
            </h3>
          </div>
          <h3 data-testid="header-score">
            Pontos:
            <span data-testid="header-score">{ score }</span>
          </h3>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  avatar: state.user.avatar,
  score: state.user.score,
});

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
