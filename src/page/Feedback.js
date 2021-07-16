import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      score: 3,
      rightAnswers: 0,

    };
  }

  perfomanceAnswer() {
    const { score } = this.state;
    const controlScore = 3;
    if (score < controlScore) {
      return (
        <p>Podia ser melhor...</p>
      );
    }
    if (score >= controlScore) {
      return (
        <p>Mandou bem!</p>
      );
    }
  }

  render() {
    const { score, rightAnswers } = this.state;
    const { email, name } = this.props;
    const hashGenerator = md5(email).toString();
    return (
      <>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hashGenerator}` }
            data-testid="header-profile-picture"
            alt="icon"
          />
          <h2 data-testid="header-player-name">
            Nome:
            { name }
          </h2>
          <h3 data-testid="header-score">
            Placar:
            Colocar placar aqui
          </h3>
          <h4 data-testid="feedback-text">{this.perfomanceAnswer()}</h4>
        </header>

        <span>
          <h4 data-testid="feedback-total-score">
            Placar Final:
            { score }
          </h4>
          <h4 data-testid="feedback-total-question">
            {`${rightAnswers > 0
              ? `Acertou ${rightAnswers} perguntas` : 'Não acertou nenhuma pergunta'}`}
          </h4>
        </span>
      </>
    );
  }
}

Feedback.propTypes = ({
  email: PropTypes.string,
  name: PropTypes.string,
}).isRequired;

const mapStateToProps = (state) => ({
  email: state.homeReducer.email,
  name: state.homeReducer.name,
});

export default connect(mapStateToProps)(Feedback);
