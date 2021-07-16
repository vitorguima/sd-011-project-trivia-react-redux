import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      score: 0,
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
    });
  }

  render() {
    const { name, score } = this.state;
    const { img } = this.props;
    return (
      <header>
        <h1 data-testid="feedback-text">Feedback</h1>
        <p data-testid="header-player-name">{name}</p>
        <img data-testid="header-profile-picture" src={ img } alt="Player avatar" />
        <p data-testid="header-score">{score}</p>
      </header>
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
