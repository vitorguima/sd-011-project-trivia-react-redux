import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  // componentDidMount() {
  //   const { name, score, email } = this.props;
  //   const picture = (<img
  //     src={ `https://www.gravatar.com/avatar/${email}` }
  //     data-testid="profile-picture"
  //     alt="avatar's search"
  //   />);
  //   const previousState = JSON.parse(localStorage.getItem('ranking')) || [];
  //   localStorage.setItem('ranking', JSON.stringify(
  //     [...previousState, { name, score, picture }],
  //   ));
  // }

  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    return (
      <>
        <p data-testid="feedback-text">Bem vindo a tela de feedback</p>
        <Header />
        <main>
          <h2 data-testid="feedback-text">
            {assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...'}
          </h2>
          <span data-testid="feedback-total-question">{assertions}</span>
          <span data-testid="feedback-total-score">{score}</span>
          <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
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
  name: state.user.name,
  email: state.user.gravatarEmail,
  score: state.user.score,
  assertions: state.user.assertions,
});

export default connect(mapStateToProps)(Feedback);
