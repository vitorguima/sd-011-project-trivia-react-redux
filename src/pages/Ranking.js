import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    // const { index } = this.state;
    // const notRedux = JSON.parse(localStorage.getItem('state'));
    // const { gravatarHash, name, score } = notRedux.player;
    // const ranking = JSON.parse(localStorage.getItem('ranking'))
    //   .sort((a, b) => b.score - a.score);
    return (
      <div>
        <div>
          <h1 data-testid="ranking-title">Lista de Ranking</h1>
          {/* {ranking.map((user, index) => (
              <div key={ user[index] }>
                <img
                  src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
                  alt="Imagem do seu avatar"
                  data-testid="header-profile-picture"
                />
                <h3 data-testid={ `player-name-${index}` }>{user.name}</h3>
                <h4 data-testid={ `player-score-${index}` }>{user.score}</h4>
              </div>))} */}
        </div>
        <nav>
          <Link to="/">
            <button
              data-testid="btn-go-home"
              type="button"
            >
              Ir ao Início
            </button>
          </Link>
        </nav>
      </div>
    );
  }
}

export default Ranking;
