import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      score: 0,
      assertions: 0,
    };
    this.getFeedback = this.getFeedback.bind(this);
  }

  componentDidMount() {
    this.getFeedback();
  }

  getFeedback() {
    const state = JSON.parse(localStorage.getItem('state'));
    this.setState({
      name: state.player.name,
      score: state.player.score,
      assertions: state.player.assertions,
    });
  }

  render() {
    const { name, score, assertions } = this.state;
    const { img } = this.props;
    const three = 3;
    return (
      <div>
        <header>
          <h1 data-testid="feedback-text">Feedback</h1>
          <p data-testid="header-player-name">{name}</p>
          <img data-testid="header-profile-picture" src={ img } alt="Player avatar" />
          <p data-testid="header-score">{score}</p>
          { assertions < three && <p data-testid="feedback-text">Podia ser melhor...</p> }
          { assertions >= three && <p data-testid="feedback-text">Mandou bem!</p> }
        </header>
        <div>
          <p data-testid="feedback-total-question">{assertions}</p>
          <p data-testid="feedback-total-score">{score}</p>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Jogar novamente</button>
          </Link>
        </div>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  img: state.login.img,
});

Feedback.propTypes = {
  img: PropTypes.string,
}.isRequired;

export default connect(MapStateToProps)(Feedback);
