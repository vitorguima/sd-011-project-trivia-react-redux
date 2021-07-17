import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

export default class FeedBack extends Component {
  handleSwitch() {
    const localStorageInfo = JSON.parse(localStorage.getItem('state')).player || null;
    const magicalNumber = 3;
    if (localStorageInfo.assertions < magicalNumber) {
      return (<p data-testid="feedback-text">Podia ser melhor...</p>);
    }
    return (<p data-testid="feedback-text">Mandou bem!</p>);
  }

  handleFinalMensage() {
    const localStorageInfo = JSON.parse(localStorage.getItem('state')).player || null;
    if (localStorageInfo.assertions === 0) {
      return 'Não acertou nenhuma pergunta';
    }
    return `Acertou ${localStorageInfo.assertions} perguntas`;
  }

  render() {
    const localStorageInfo = JSON.parse(localStorage.getItem('state')).player || null;
    console.log(localStorageInfo.assertions);
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(localStorageInfo.gravatarEmail).toString()}` }
            alt="Imagem do Email"
          />
          <p data-testid="header-player-name">{ localStorageInfo.name }</p>
          <span data-testid="header-score">{ localStorageInfo.score }</span>
        </header>
        <section>
          <p data-testid="feedback-total-score">{localStorageInfo.score}</p>
          <p data-testid="feedback-total-question">{localStorageInfo.assertions}</p>
          {this.handleFinalMensage()}
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Jogar novamente</button>
          </Link>
        </section>
        {this.handleSwitch()}
      </>
    );
  }
}
