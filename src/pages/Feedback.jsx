import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    return (
      <Layout>
        <main>
          <GameHeader />
          <div data-testid="feedback-text">{this.renderMsg()}</div>
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
