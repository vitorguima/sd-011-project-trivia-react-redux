import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  assertionsAnswer() {
    const { player: { assertions } } = this.props;
    const n = 3;
    if (assertions >= n) {
      return 'Mandou bem!';
    }
    if (assertions < n) {
      return 'Podia ser melhor...';
    }
  }

  render() {
    const { player: { score, assertions } } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ this.assertionsAnswer() }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <Link data-testid="btn-play-again" to="/">Jogar novamente</Link>
        {/* <button type="button" data-testid="btn-play-again">Jogar Novamente</button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.playerReducer,
});

Feedback.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
