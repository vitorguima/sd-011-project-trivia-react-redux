import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from '../components/common/Layout';
import GameHeader from '../components/GameHeader';

class Feedback extends Component {
  renderMsg() {
    const { assertions } = this.props;
    if (assertions > 2) {
      return 'Mandou bem!';
    }
    return 'Podia ser melhor...';
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <Layout>
        <main>
          <GameHeader />
          <p data-testid="feedback-text">{this.renderMsg()}</p>
          <p data-testid="feedback-total-score">
            {score}
          </p>
          <p data-testid="feedback-total-question">{assertions}</p>
          <Link to="/" data-testid="btn-play-again">Jogar Novamente</Link>
        </main>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.gravatarEmail,
  name: state.user.name,
  assertions: state.user.assertions,
  score: state.user.score,
  token: state.user.token,
  quest: state.questions.questions,

});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;
