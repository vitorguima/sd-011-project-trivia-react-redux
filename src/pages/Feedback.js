import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const THREE = 3;
    return (
      <>
        <p data-testid="feedback-text">Bem vindo a tela de feedback</p>
        <Header />
        <main>
          <h2 data-testid="feedback-text">
            {assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'}
          </h2>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.user.score,
  assertions: state.user.assertions,
});

export default connect(mapStateToProps)(Feedback);
