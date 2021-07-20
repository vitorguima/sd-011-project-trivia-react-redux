import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    return history.push('/');
  }

  render() {
    // const notRedux = JSON.parse(localStorage.getItem('state'));
    // const { gravatarEmail } = notRedux.player;
    // localStorage.setItem('state', JSON.stringify(notRedux));
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
                <h3 data-testid={ `player-name-${index}` }>{ user.name }</h3>
                <h4 data-testid={ `player-score-${index}` }>{ user.score }</h4>
              </div>))} */}
        </div>
        <nav>
          <Link to="/">
            <button
              data-testid="btn-go-home"
              type="button"
              onClick={ this.handleClick() }
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
