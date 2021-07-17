import React from 'react';
import logo from '../../trivia.png';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img src={ logo } className="App-logo" alt="Logo" />
      </header>
    );
  }
}

export default Header;
