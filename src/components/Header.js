import React from 'react';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';

const Header = () => {
  const { name, gravatarEmail, score } = useSelector(({ userInfo }) => userInfo.player);
  return (
    <header>
      <img
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
        alt={ gravatarEmail }
      />
      <span data-testid="header-player-name">{ name }</span>
      <span data-testid="header-score">{ score }</span>
    </header>
  );
};

export default Header;
