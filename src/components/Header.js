import React from 'react';
import md5 from 'crypto-js/md5';

const Header = () => (
  <header>
    <img
      data-testid="header-profile-picture"
      src={ md5('email@email.com').toString() }
      alt=""
    />
    <span data-testid="header-player-name">Nome da pessoa</span>
    <span data-testid="header-score">0</span>
  </header>
);

export default Header;
