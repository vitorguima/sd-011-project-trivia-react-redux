import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import { resetState } from '../actions';

class Feedback extends Component {
  componentDidMount() {
    const { name, email, score } = this.props;
    let ranking = [];
    let data = '';
    if (localStorage.getItem('ranking')) {
      data = localStorage.getItem('ranking');
      ranking = JSON.parse(data);
      localStorage.removeItem('ranking');
    }
    ranking = [...ranking, { name, email, score }];
    data = JSON.stringify(ranking);
    localStorage.setItem('ranking', data);
  }

  componentWillUnmount() {
    const { reset } = this.props;
    reset();
  }

  render() {
    const tres = 3;
    const data = localStorage.getItem('state');
    const state = JSON.parse(data);
    const { assertions, score } = state.player;
    const goodScore = assertions >= tres;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {goodScore ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
  reset: PropTypes.func,
}.isRequired;
