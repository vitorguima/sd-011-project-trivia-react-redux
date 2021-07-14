import React from 'react';
import logo from '../../trivia.png';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img src={ logo } alt="Logo" />
      </header>
    );
  }
}

export default Header;
