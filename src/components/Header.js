import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail, name, score } = notRedux.player;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
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
