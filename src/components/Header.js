import React from 'react';
// import { connect } from 'react-redux';

function Header() {
  // const { player } = this.props;
  return (
    <header>
      <img data-testid="header-profile-picture" src={ player.avatar } alt="avatar" />
      <h2 data-testid="header-player-name">{ player.name }</h2>
      <h3>{ player.score }</h3>
    </header>
  );
}

// const mapStateToProps = (state) => ({
//   player: state.player,
// });

export default Header; // connect(mapStateToProps, mapDispatchToProps)(Header);
