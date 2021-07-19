import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  render() {
    const { index } = this.state;
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { gravatarHash, name, score } = notRedux.user;
    localStorage.setItem('state', JSON.stringify(notRedux));
    const idname = `player-name-${index}`;
    const idscore = `player-score-${index}`;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarHash}` }
          alt="Imagem do seu avatar"
          data-testid="header-profile-picture"
        />
        <h3 data-testid={ idname }>{ name }</h3>
        <h4 data-testid={ idscore }>{ score }</h4>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Ir ao Início</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
