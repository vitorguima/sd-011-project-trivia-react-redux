import React from 'react';
import logo from '../trivia.png';

export default function Header() {
  const token = localStorage.getItem('token');
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${token}` }
          alt="avatar"
        />
        <p data-testid="header-player-name">nome da pessoa</p>
        <div data-testid="header-score">placar</div>
      </header>
    </div>
  );
}
