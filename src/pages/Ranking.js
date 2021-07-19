import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { index } = this.state;
    const notRedux = JSON.parse(localStorage.getItem('state'));
    const { gravatarHash, name, score } = notRedux.user;
    localStorage.setItem('state', JSON.stringify(notRedux));
    // const ranking = JSON.parse(localStorage.getItem('ranking'))
    //   .sort((a, b) => b.score - a.score);

    const idname = `player-name-${index}`;
    const idscore = `player-score-${index}`;
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${gravatarHash}` }
            alt="Imagem do seu avatar"
            data-testid="header-profile-picture"
          />
          <h3 data-testid={ idname }>{ name }</h3>
          <h4 data-testid={ idscore }>{ score }</h4>
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>
        <nav>
          <Link to="/">
            <button
              data-testid="btn-go-home"
              type="button"
              onClick={ this.handleClick }
            >
              Ir ao Início
            </button>
          </Link>
        </nav>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Ranking;
