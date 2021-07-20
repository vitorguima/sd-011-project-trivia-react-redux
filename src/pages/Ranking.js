import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  }
  // }

  urlCreator() {
    const { email } = this.props;
    const hash = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return hash;
  }

  render() {
    const { nome, score } = this.props;
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const ranking = getRanking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">TITULO RANKING</h1>
        <ol>
          { ranking.map((user, index) => (
            <li key={ index }>
              <img src={ this.urlCreator() } alt={ `foto do jogador ${nome}` } />
              <h5 data-testid={ `player-score-${index}` }>{ `score: ${score}`}</h5>
              <h3 data-testid={ `player-name-${index}` }>{nome}</h3>
            </li>))}
        </ol>
        <Link
          to="/"
          data-testid="btn-go-home"
        >
          <button type="button">
            Tela Inicial
          </button>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  nome: state.loginReducer.login.nome,
  score: state.triviaReducer.score,
  email: state.loginReducer.login.email,
});

Ranking.propTypes = {
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
