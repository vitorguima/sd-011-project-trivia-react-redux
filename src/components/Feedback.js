import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import { resetState } from '../actions';
import '../styles/Feedback.css';

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
      <div className="feedback-screen">
        <Header />
        <p data-testid="feedback-text" className="score-message">
          {goodScore ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
        <div className="score">
          <div className="score-info">
            <span data-testid="feedback-total-question">
              {assertions}
            </span>
            <span> acertos de 5</span>
          </div>
          <div className="score-info">
            <span>Placar: </span>
            <span data-testid="feedback-total-score">
              {score}
            </span>
          </div>
        </div>
        <div className="buttons">
          <Link to="/" className="feedback-btns play-again" data-testid="btn-play-again">
            Jogar novamente
          </Link>
          <Link to="/ranking" className="feedback-btns ranking" data-testid="btn-ranking">
            Ver Ranking
          </Link>
        </div>
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
