import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Game/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.handleQuestions = this.handleQuestions.bind(this);
  }

  handleQuestions() {
    const { assertions } = this.props;
    const initialCount = 3;
    if (assertions < initialCount) {
      return 'Podia ser melhor...';
    }
    if (assertions >= initialCount) {
      return 'Mandou bem!';
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h5 data-testid="feedback-text">{ this.handleQuestions() }</h5>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.userReducer.assertion,
});

Feedback.propTypes = {
  assertion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
