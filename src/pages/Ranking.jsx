import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newGame } from '../actions';
import { getFromStore } from '../service/handleLocalStorage';

class Ranking extends Component {
  render() {
    const { prepareNewGame } = this.props;
    const rankingArray = getFromStore('ranking')
      .sort((ranking1, ranking2) => ranking2.score - ranking1.score);
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        {rankingArray.map(({ name, score, url }, index) => (
          <div key={ index }>
            <img src={ url } alt="player" />
            <h2 data-testid={ `player-name-${index}` }>{name}</h2>
            <h3 data-testid={ `player-score-${index}` }>{score}</h3>
          </div>
        ))}
        <Link
          to="/"
          data-testid="btn-go-home"
          onClick={ () => prepareNewGame() }
        >
          Voltar para a tela inical
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  prepareNewGame: () => dispatch(newGame()),
});

Ranking.propTypes = ({
  prepareNewGame: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps)(Ranking);
