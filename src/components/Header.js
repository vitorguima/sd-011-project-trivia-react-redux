import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import border from '../images/header_base.png';

class Header extends Component {
  render() {
    const { profileImg, profileName, profileScore } = this.props;
    return (
      <div>
        <header>
          <img
            src={ profileImg }
            data-testid="header-profile-picture"
            alt="User profile"
          />
          <span
            data-testid="header-player-name"
            className="header-player-name"
          >
            { profileName }
          </span>
          <div className="score-div-container">
            <h3 className="text-score">
              SCORE
            </h3>
            <h2
              className="ingame-score-number"
              data-testid="header-score"
            >
              { profileScore }
            </h2>
          </div>

        </header>
        <div className="border-header">
          <img src={ border } alt="" className="img-border" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profileImg: state.player.srcGravatarImg,
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
  profileScore: PropTypes.number.isRequired,
};
