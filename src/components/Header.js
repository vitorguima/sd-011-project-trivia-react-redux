import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

export default class Header extends Component {
  constructor() {
    super();
    this.fetchAvatar = this.fetchAvatar.bind(this);
    this.getItemsFromLocalStorage = this.getItemsFromLocalStorage.bind(this);
  }

  componentDidUpdate() {
    this.fetchAvatar();
  }

  // Se usar essa função, o requisito 2 não passa e não descobri o motivo;
  getItemsFromLocalStorage() {
    const playerString = localStorage.getItem('state');
    const obj = JSON.parse(playerString);
    const { name, email, score } = obj.player;
    const avatar = this.fetchAvatar(email, name);
    return {
      score,
      name,
      email: avatar,
    };
  }

  async fetchAvatar(email) {
    const avatar = md5(email).toString();
    const avatarFetch = await fetch(`https://www.gravatar.com/avatar/${avatar}`);
    return avatarFetch;
  }

  render() {
    const { score, name, email } = this.getItemsFromLocalStorage();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="profilePhoto"
          src={ email }
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h4 data-testid="header-score">{ score }</h4>
      </header>
    );
  }
}
