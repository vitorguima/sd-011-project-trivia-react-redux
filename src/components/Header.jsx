import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, emailHash, score } = this.props;
    return (
      <header>
        <h1>Tela do jogo</h1>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailHash}` } alt="" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">
          { score }
        </span>
      </header>
    );
  }
}

export default Header;

Header.propTypes = ({
  gameData: PropTypes.objectOf(PropTypes.object),
  recivedGameData: PropTypes.func,
}).isRequired;
