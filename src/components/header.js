import React from 'react';

export default function Header() {
  const token = localStorage.getItem('token');
  const player = JSON.parse(localStorage.getItem('state'));
  console.log(token);
  console.log(player);
  return (
    <div>
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${token}` }
          alt="avatar"
        />
        <p data-testid="header-player-name">{player.name}</p>
        <div data-testid="header-score">{player.score}</div>
      </header>
    </div>
  );
}
