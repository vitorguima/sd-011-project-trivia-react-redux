import { MD5 } from 'crypto-js';
import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/GameScreenHeader.css';

export default function GameScreenHeader() {
  const email = useSelector((state) => state.login.email);
  const hashEmail = MD5(email).toString();
  const userName = useSelector((state) => state.login.name);
  // console.log(userName);
  console.log(email);
  return (
    <header className="header-container">
      <img
        src={ `https://www.gravatar.com/avatar/${hashEmail}` }
        data-testid="header-profile-picture"
        alt="Player avatar"
      />
      <span
        className="player-name"
        data-testid="header-player-name"
      >
        {userName}
      </span>
      <span
        data-testid="header-score"
      >
        0
      </span>
    </header>
  );
}
