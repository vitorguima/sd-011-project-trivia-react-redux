import React, { Component } from 'react';

class Header extends Component {
  render() {
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { gravatarHash, name, score } = notRedux.user;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarHash}` }
          alt="Imagem do seu avatar"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h4 data-testid="header-score">{ score }</h4>
      </header>
    );
  }
}

export default Header;
