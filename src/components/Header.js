import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../pages/css/Header.css';

class Header extends Component {
  render() {
    const { name, gravatar, score } = this.props;
    const hash = md5(gravatar).toString();
    return (
      <div className="header-container">
        <img
          className="image-avatar"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Imagem gravatar"
        />
        <div className="header-player-name-container">
          <h3 data-testid="header-player-name">{name}</h3>
        </div>
        <div className="header-score-container">
          <h4>Score: </h4>
          <p data-testid="header-score">{score}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatar: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string,
  gravatar: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
