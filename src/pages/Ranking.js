import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import '../App.css';

export default class extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="rankingDiv">
        <header className="App-header-telas">
          <img src={ logo } className="App-logo-telas" alt="logo" />
          <h1 id="rankingH1" data-testid="ranking-title">Ranking</h1>
        </header>
        {/* <h1 id="rankingH1" data-testid="ranking-title">Ranking</h1> */}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Jogar Novamente
          </button>
        </Link>
        <div className="rankingList">
          {ranking.sort((a, b) => b.score - a.score).map((value, index) => (
            <div className="rankingItem" key={ index }>
              <img src={ value.gravatarImg } alt="Avatar do jogador" />
              &nbsp;
              <div>
                <span data-testid={ `player-name-${index}` }>{ value.name}</span>
                <span data-testid={ `player-score-${index}` }>{ value.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
