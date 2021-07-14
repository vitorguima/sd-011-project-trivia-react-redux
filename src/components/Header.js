import React from 'react';
// import { connect } from 'react-redux';

function Header() {
  // const { player } = this.props;
  return (
    <header>
      <img data-testid="header-profile-picture" src={ player.avatar } alt="avatar" />
      <span data-testid="header-player-name">{ player.name }</span>
      <span data-testid="header-score">{ player.score }</span>
    </header>
  );
}

// const mapStateToProps = (state) => ({
//   player: state.player,
// });

export default Header; // connect(mapStateToProps, mapDispatchToProps)(Header);
