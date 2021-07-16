import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';

const Header = () => {
  const { name, gravatarEmail } = useSelector((state) => state.userLogin);
  const [scorevalue, setScorevalue] = useState(0);
  const { score } = JSON.parse(localStorage.getItem('player'));

  useEffect(() => {
    setScorevalue(score);
  }, []);

  return (
    <header>
      <img
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
        alt=""
      />
      <span data-testid="header-player-name">{ name }</span>
      <span data-testid="header-score">{ scorevalue }</span>
    </header>
  );
};

export default Header;
