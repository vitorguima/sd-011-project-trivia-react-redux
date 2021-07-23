import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import '../style/index.css';

export default class Feedbacks extends Component {
  constructor() {
    super();
    this.state = {
      score: JSON.parse(localStorage.state).player.score,
      name: JSON.parse(localStorage.state).player.name,
      assertions: JSON.parse(localStorage.state).player.assertions,
    };
  }

  setLocalStorage() {
    const infoPlayer = JSON.parse(localStorage.getItem('state')).player;
    const { name, score } = infoPlayer;
    console.log(name);
    const hash = md5(localStorage.token).toString();
    const userImage = `https://www.gravatar.com/avatar/${hash}`;
    if (localStorage.ranking) {
      localStorage.setItem('ranking',
        JSON.stringify([...JSON.parse(localStorage.ranking),
          { name, score, userImage }]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([{ name, score, userImage }]));
    }
  }

  mensage() {
    const tres = 3;
    const { assertions } = this.state;
    if (assertions >= tres) {
      return (
        'Mandou bem!'
      );
    }
    return (
      'Podia ser melhor...'
    );
  }

  render() {
    const { score, name, assertions } = this.state;
    return (
      <div className="container-feedback">
        <p data-testid="feedback-text">Feedback</p>
        <Header
          score={ score }
          name={ name }
        />
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-text">{this.mensage()}</p>
        <Link to="/">
          <button className="btn-novo-jogo" type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            className="btn-ranking"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.setLocalStorage }
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}
