import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newGame } from '../actions';

class Ranking extends Component {
  render() {
    const { prepareNewGame } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
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
