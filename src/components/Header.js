import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const getStorage = () => JSON.parse(localStorage.state);
    const { player: { gravatarEmail, name } } = getStorage();
    const { score } = this.props;
    return (
      <div>
        <header>
          <h1>JOGO</h1>
          <img
            src={ gravatarEmail }
            data-testid="header-profile-picture"
            alt={ name }
          />
          <span
            data-testid="header-player-name"
          >
            { name }
          </span>
          <span
            data-testid="header-score"
          >
            { score }
          </span>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Header;
